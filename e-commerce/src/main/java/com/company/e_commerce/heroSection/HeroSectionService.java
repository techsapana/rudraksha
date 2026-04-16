package com.company.e_commerce.heroSection;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface HeroSectionService {

    // Bulk upload (MAIN FEATURE)
    List<HeroSectionResponse> createBulk(
            List<MultipartFile> images,
            List<Integer> displayOrders
    );

    // Update metadata (order / active toggle)
    HeroSectionResponse updateMeta(
            Long id,
            Integer displayOrder,
            Boolean isActive
    );

    // Delete image
    void delete(Long id);

    // Admin → all images
    List<HeroSectionResponse> getAllForAdmin();

    // ✅ User → only active + ordered
    List<HeroSectionResponse> getAllForUser();

	HeroSectionStatsResponse getHeroStats();
}