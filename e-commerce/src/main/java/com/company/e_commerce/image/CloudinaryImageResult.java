package com.company.e_commerce.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter @AllArgsConstructor
@Builder
public class CloudinaryImageResult {
    private String imageUrl;
    private String publicId;
}
