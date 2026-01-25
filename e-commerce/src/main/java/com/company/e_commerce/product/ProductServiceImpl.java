package com.company.e_commerce.product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.company.e_commerce.category.Category;
import com.company.e_commerce.category.CategoryRepository;
import com.company.e_commerce.expection.BadRequestException;
import com.company.e_commerce.expection.ResourceNotFoundException;
import com.company.e_commerce.image.CloudinaryImageResult;
import com.company.e_commerce.image.ImageService;
import com.company.e_commerce.tag.Tag;
import com.company.e_commerce.tag.TagRepository;

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

        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));

        if (tags.isEmpty()) {
            throw new BadRequestException("At least one tag is required");
        }

        List<CloudinaryImageResult> uploadedImages =
                imageService.uploadProductImages(
                        images,
                        category.getName(),
                        request.getName()
                );

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(category)
                .tags(tags)
                .images(new ArrayList<>())
                .build();

        uploadedImages.forEach(img -> {
            ProductImage pi = new ProductImage();
            pi.setImageUrl(img.getImageUrl());
            pi.setPublicId(img.getPublicId());
            pi.setProduct(product);
            product.getImages().add(pi);
        });

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
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        List<String> publicIds = product.getImages()
            .stream()
            .map(ProductImage::getPublicId)
            .toList();

        imageService.deleteImages(publicIds);
        productRepository.delete(product);
    }

    private ProductResponse map(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
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
