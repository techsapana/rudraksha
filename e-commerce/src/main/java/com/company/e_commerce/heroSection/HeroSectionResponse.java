package com.company.e_commerce.heroSection;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HeroSectionResponse {

    private Long id;
    private String title;
    private Double basePrice;
    private String imageUrl;
}
