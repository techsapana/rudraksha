package com.company.e_commerce.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private String category;
    private String description;
    private Set<String> tags;
    private List<String> images;
}
