package com.company.e_commerce.image;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    List<CloudinaryImageResult> uploadProductImages(
            List<MultipartFile> files,
            String categoryName,
            String productName
    );

    void deleteImages(List<String> publicIds);
    
    CloudinaryImageResult uploadHeroImage(MultipartFile file);

}
