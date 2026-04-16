package com.company.e_commerce.admin;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.product.ProductCreateRequest;
import com.company.e_commerce.product.ProductDetailResponse;
import com.company.e_commerce.product.ProductResponse;
import com.company.e_commerce.product.ProductService;
import com.company.e_commerce.product.ProductStatsResponse;
import com.company.e_commerce.product.ProductUpdateRequest;
import com.company.e_commerce.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    private final ProductService productService;

    //  CREATE
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ProductResponse>> create(
            @Valid @RequestPart("data") ProductCreateRequest request,
            @RequestPart("images") List<MultipartFile> images
    ) {
        ProductResponse response = productService.createProduct(request, images);
        return ResponseUtil.success("Product created successfully", response);
    }

    //  UPDATE
    @PutMapping(
        value = "/{id}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<ProductResponse>> update(
            @PathVariable Long id,
            @Valid @RequestPart("data") ProductUpdateRequest request,
            @RequestPart(value = "images", required = false)
            List<MultipartFile> images
    ) {
        ProductResponse response =
                productService.updateProduct(id, request, images);

        return ResponseUtil.success("Product updated successfully", response);
    }

    // ✅ ADMIN GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAll() {
        return ResponseUtil.success(
                "Products fetched successfully",
                productService.getAllProducts()
        );
    }

    //  ADMIN GET BY ID
//    @GetMapping("/{id}")
//    public ResponseEntity<ApiResponse<ProductResponse>> getById(
//            @PathVariable Long id
//    ) {
//        return ResponseUtil.success(
//                "Product fetched successfully",
//                productService.getProductById(id)
//        );
//    }

    //  DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseUtil.success("Product deleted successfully");
    }
    
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<ProductStatsResponse>> productStats() {
        return ResponseUtil.success(
                "Product stats fetched successfully",
                productService.getProductStats()
        );
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductDetail(id));
    }
}
