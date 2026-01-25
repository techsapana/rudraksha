package com.company.e_commerce.heroSection;

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
    public HeroSectionResponse create(
            HeroSectionRequest request,
            MultipartFile image) {

        CloudinaryImageResult img =
                imageService.uploadHeroImage(image);

        HeroSection hero = HeroSection.builder()
                .title(request.getTitle())
                .basePrice(request.getBasePrice())
                .imageUrl(img.getImageUrl())
                .imagePublicId(img.getPublicId())
                .build();

        return mapToResponse(repository.save(hero));
    }

    @Override
    public HeroSectionResponse update(
            Long id,
            HeroSectionRequest request,
            MultipartFile image) {

        HeroSection hero = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero section not found"));

        hero.setTitle(request.getTitle());
        hero.setBasePrice(request.getBasePrice());

        if (image != null && !image.isEmpty()) {
            imageService.deleteImages(List.of(hero.getImagePublicId()));

            CloudinaryImageResult img =
                    imageService.uploadHeroImage(image);

            hero.setImageUrl(img.getImageUrl());
            hero.setImagePublicId(img.getPublicId());
        }

        return mapToResponse(repository.save(hero));
    }

    @Override
    public void delete(Long id) {
        HeroSection hero = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero section not found"));

        imageService.deleteImages(List.of(hero.getImagePublicId()));
        hero.setIsActive(false);
        repository.save(hero);
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
        return repository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private HeroSectionResponse mapToResponse(HeroSection hero) {
        return HeroSectionResponse.builder()
                .id(hero.getId())
                .title(hero.getTitle())
                .basePrice(hero.getBasePrice())
                .imageUrl(hero.getImageUrl())
                .build();
    }
}
