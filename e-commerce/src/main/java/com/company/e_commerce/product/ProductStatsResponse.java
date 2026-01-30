package com.company.e_commerce.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductStatsResponse {
    private long totalProducts;
    private MostSoldProductResponse mostSoldProduct;
}
