package com.company.e_commerce.heroSection;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HeroSectionResponse {

    private Long id;
    private String imageUrl;
    private Integer displayOrder;
}	