package com.company.e_commerce.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MostSoldProductResponse {
    private Long id;
    private String name;
    private Long soldCount;
}
