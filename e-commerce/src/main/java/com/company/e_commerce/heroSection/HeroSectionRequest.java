package com.company.e_commerce.heroSection;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HeroSectionRequest {

    @NotBlank
    private String title;

    @NotNull
    private Double basePrice;
}
