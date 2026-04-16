package com.company.e_commerce.product;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.category.Category;
import com.company.e_commerce.category.CategoryRepository;
import com.company.e_commerce.expection.ResourceNotFoundException;
import com.company.e_commerce.image.CloudinaryImageResult;
import com.company.e_commerce.image.ImageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;

    @Override
    public ProductResponse createProduct(
            ProductCreateRequest request,
            List<MultipartFile> images
    ) {

        // 1️⃣ Fetch category
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
           
        BigDecimal discountedPrice = calculateDiscountedPrice(
                request.getPrice(),
                request.getDiscountPercentage()
        );
        
        //  Upload images
        List<CloudinaryImageResult> uploadedImages =
                imageService.uploadProductImages(
                        images,
                        category.getName(),
                        request.getName()
                );

        //  Build product with safe defaults
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .discountPercentage(request.getDiscountPercentage())
                .discountedPrice(discountedPrice)
                .category(category)
                .images(new ArrayList<>())
                .isActive(true)
                .soldCount(0L)
                .build();

        //  Map uploaded images to ProductImage entities
        uploadedImages.forEach(img -> {
            ProductImage pi = new ProductImage();
            pi.setImageUrl(img.getImageUrl());
            pi.setPublicId(img.getPublicId());
            pi.setProduct(product);
            product.getImages().add(pi);
        });

        // 6️⃣ Save and return
        return map(productRepository.save(product));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
            .stream()
            .map(this::map)
            .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return map(product);
    }

    @Override
    public ProductResponse updateProduct(
            Long productId,
            ProductUpdateRequest request,
            List<MultipartFile> images
    ) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Update basic fields
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());

        // Update category if changed
        if (!product.getCategory().getId().equals(request.getCategoryId())) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        product.setDiscountPercentage(request.getDiscountPercentage());

        BigDecimal discountedPrice = calculateDiscountedPrice(
                request.getPrice(),
                request.getDiscountPercentage()
        );

        product.setDiscountedPrice(discountedPrice);

        // Replace images ONLY if new images are provided
        if (images != null && !images.isEmpty()) {

            // delete old images from Cloudinary
            List<String> oldPublicIds = product.getImages()
                    .stream()
                    .map(ProductImage::getPublicId)
                    .toList();

            imageService.deleteImages(oldPublicIds);

            // clear old images
            product.getImages().clear();

            // upload new images
            List<CloudinaryImageResult> uploadedImages =
                    imageService.uploadProductImages(
                            images,
                            product.getCategory().getName(),
                            product.getName()
                    );

            uploadedImages.forEach(img -> {
                ProductImage pi = new ProductImage();
                pi.setImageUrl(img.getImageUrl());
                pi.setPublicId(img.getPublicId());
                pi.setProduct(product);
                product.getImages().add(pi);
            });
        }

        return map(productRepository.save(product));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // 1️⃣ Collect all image public IDs
        List<String> imagePublicIds = product.getImages().stream()
                .map(ProductImage::getPublicId)
                .toList();

        // 2️⃣ Delete images from cloud
        if (!imagePublicIds.isEmpty()) {
            imageService.deleteImages(imagePublicIds);
        }

        // 3️⃣ HARD DELETE product from DB
        productRepository.delete(product);
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProductStatsResponse getProductStats() {

        long totalProducts = productRepository.count();

        MostSoldProductResponse mostSold = productRepository
                .findTopByOrderBySoldCountDesc()
                .map(p -> new MostSoldProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getSoldCount()
                ))
                .orElse(null);

        return new ProductStatsResponse(
                totalProducts,
                mostSold
        );
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProductDetailResponse getProductDetail(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return ProductDetailResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .longDescription(product.getLongDescription()) // if added
                .price(product.getPrice())
                .discountPercentage(product.getDiscountPercentage())
                .discountedPrice(product.getDiscountedPrice())
                .category(product.getCategory().getName())
                .images(
                        product.getImages()
                                .stream()
                                .map(ProductImage::getImageUrl)
                                .toList()
                )
                .build();
    }

    private ProductResponse map(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .category(product.getCategory().getName())
                .discountPercentage(product.getDiscountPercentage())
                .discountedPrice(product.getDiscountedPrice())
                .images(
                    product.getImages()
                        .stream()
                        .map(ProductImage::getImageUrl)
                        .toList()
                )
                .build();
    }
    
    private BigDecimal calculateDiscountedPrice(BigDecimal price, BigDecimal discountPercentage) {

        if (discountPercentage == null || discountPercentage.compareTo(BigDecimal.ZERO) <= 0) {
            return price;
        }

        BigDecimal discountAmount = price
                .multiply(discountPercentage)
                .divide(BigDecimal.valueOf(100));

        return price.subtract(discountAmount);
    }
}
