package com.company.e_commerce.product;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ProductResponse createProduct(
            ProductCreateRequest request,
            List<MultipartFile> images
    );

    ProductResponse updateProduct(
            Long productId,
            ProductUpdateRequest request,
            List<MultipartFile> images
    );
    ProductStatsResponse getProductStats();

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    void deleteProduct(Long id);
    
    ProductDetailResponse getProductDetail(Long productId);
}
