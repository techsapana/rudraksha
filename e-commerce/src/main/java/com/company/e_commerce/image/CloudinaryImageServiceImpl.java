package com.company.e_commerce.image;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.expection.BadRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;

    @Override
    public List<CloudinaryImageResult> uploadProductImages(
            List<MultipartFile> files,
            String categoryName,
            String productName
    ) {

        if (files == null || files.isEmpty()) {
            throw new BadRequestException("Product images are required");
        }

        List<CloudinaryImageResult> results = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        Map.of(
                            "folder", "products/" + categoryName + "/" + productName,
                            "resource_type", "image"
                        )
                );

                results.add(
                        CloudinaryImageResult.builder()
                                .imageUrl(uploadResult.get("secure_url").toString())
                                .publicId(uploadResult.get("public_id").toString())
                                .build()
                );

            } catch (IOException e) {
                throw new RuntimeException("Failed to upload product image");
            }
        }

        return results;
    }

    @Override
    public void deleteImages(List<String> publicIds) {
        publicIds.forEach(id -> {
            try {
                cloudinary.uploader().destroy(id, Map.of());
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image");
            }
        });
    }
    
    @Override
    public CloudinaryImageResult uploadHeroImage(MultipartFile file) {

        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                        "folder", "hero",
                        "resource_type", "image"
                    )
            );

            return CloudinaryImageResult.builder()
                    .imageUrl(uploadResult.get("secure_url").toString())
                    .publicId(uploadResult.get("public_id").toString())
                    .build();

        } catch (IOException e) {
            throw new RuntimeException("Hero image upload failed");
        }
    }

}
