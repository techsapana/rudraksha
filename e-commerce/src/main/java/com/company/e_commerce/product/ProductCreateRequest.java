package com.company.e_commerce.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductCreateRequest {

    @NotBlank
    private String name;

    private String description; // SHORT (optional)
    private String longDescription; // FULL DETAIL

    @NotNull
    private BigDecimal price;

    private BigDecimal discountPercentage;

    @NotNull
    private Long categoryId;
}
