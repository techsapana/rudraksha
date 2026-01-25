package com.company.e_commerce.heroSection;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface HeroSectionService {

    HeroSectionResponse create(
            HeroSectionRequest request,
            MultipartFile image
    );

    HeroSectionResponse update(
            Long id,
            HeroSectionRequest request,
            MultipartFile image
    );

    void delete(Long id);

    List<HeroSectionResponse> getAllForAdmin();

    List<HeroSectionResponse> getAllForUser();
}
