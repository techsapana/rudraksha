package com.company.e_commerce.product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.category.Category;
import com.company.e_commerce.category.CategoryRepository;
import com.company.e_commerce.expection.BadRequestException;
import com.company.e_commerce.expection.ResourceNotFoundException;
import com.company.e_commerce.image.CloudinaryImageResult;
import com.company.e_commerce.image.ImageService;
import com.company.e_commerce.tag.Tag;
import com.company.e_commerce.tag.TagRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ImageService imageService;

    @Override
    public ProductResponse createProduct(
            ProductCreateRequest request,
            List<MultipartFile> images
    ) {

        // 1️⃣ Fetch category
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // 2️⃣ Fetch tags
        Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
        if (tags.isEmpty()) {
            throw new BadRequestException("At least one tag is required");
        }

        // 3️⃣ Upload images
        List<CloudinaryImageResult> uploadedImages =
                imageService.uploadProductImages(
                        images,
                        category.getName(),
                        request.getName()
                );

        // 4️⃣ Build product with safe defaults
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(category)
                .tags(tags)
                .images(new ArrayList<>())
                .isActive(true)        // Default to active
                .soldCount(0L)         // Default sold count
                .build();

        // 5️⃣ Map uploaded images to ProductImage entities
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

        // Update tags
        Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
        if (tags.isEmpty()) {
            throw new BadRequestException("At least one tag is required");
        }
        product.setTags(tags);

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


    private ProductResponse map(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .category(product.getCategory().getName())
                .tags(
                    product.getTags()
                        .stream()
                        .map(Tag::getName)
                        .collect(Collectors.toSet())
                )
                .images(
                    product.getImages()
                        .stream()
                        .map(ProductImage::getImageUrl)
                        .toList()
                )
                .build();
    }
}
