package com.company.e_commerce.product;

import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDetailResponse {

    private Long id;
    private String name;

    // Short description (optional)
    private String description;

    // Full detailed description (recommended for product page)
    private String longDescription;

    // Pricing
    private BigDecimal price;
    private BigDecimal discountPercentage;
    private BigDecimal discountedPrice;

    // Category name
    private String category;

    // All product images (gallery view)
    private List<String> images;
}