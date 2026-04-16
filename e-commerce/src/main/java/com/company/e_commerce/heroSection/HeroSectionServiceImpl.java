package com.company.e_commerce.heroSection;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.image.CloudinaryImageResult;
import com.company.e_commerce.image.ImageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HeroSectionServiceImpl implements HeroSectionService {

    private final HeroSectionRepository repository;
    private final ImageService imageService;

    @Override
    public List<HeroSectionResponse> createBulk(
            List<MultipartFile> images,
            List<Integer> displayOrders
    ) {

        List<HeroSection> galleryList = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {

            MultipartFile file = images.get(i);

            CloudinaryImageResult img =
                    imageService.uploadHeroImage(file);

            HeroSection gallery = HeroSection.builder()
                    .imageUrl(img.getImageUrl())
                    .imagePublicId(img.getPublicId())
                    .displayOrder(
                            displayOrders != null && displayOrders.size() > i
                                    ? displayOrders.get(i)
                                    : i
                    )
                    .isActive(true)
                    .build();

            galleryList.add(gallery);
        }

        return repository.saveAll(galleryList)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public HeroSectionResponse updateMeta(Long id, Integer displayOrder, Boolean isActive) {

        HeroSection hero = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        hero.setDisplayOrder(displayOrder);
        hero.setIsActive(isActive);

        return mapToResponse(repository.save(hero));
    }
    
    @Override
    public void delete(Long id) {
        HeroSection hero = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero section not found"));

        // delete image from cloud (Cloudinary / S3 etc)
        imageService.deleteImages(List.of(hero.getImagePublicId()));

        // hard delete from DB
        repository.delete(hero);
    }


    @Override
    public List<HeroSectionResponse> getAllForAdmin() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<HeroSectionResponse> getAllForUser() {
        return repository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    
    @Override
    public HeroSectionStatsResponse getHeroStats() {
        long total = repository.count();
        return new HeroSectionStatsResponse(total);
    }

    private HeroSectionResponse mapToResponse(HeroSection hero) {
        return HeroSectionResponse.builder()
                .id(hero.getId())
                .imageUrl(hero.getImageUrl())
                .displayOrder(hero.getDisplayOrder())
                .build();
    }
}
