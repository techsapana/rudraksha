package com.company.e_commerce.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.heroSection.HeroSectionRequest;
import com.company.e_commerce.heroSection.HeroSectionService;
import com.company.e_commerce.heroSection.HeroSectionStatsResponse;
import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
	@RequestMapping("/api/admin/hero")
	@RequiredArgsConstructor
public class HeroSectionAdminController {

    private final HeroSectionService service;

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestPart HeroSectionRequest request,
            @RequestPart MultipartFile image) {

        return ResponseEntity.ok(
            ResponseUtil.success(
                "Hero section created",
                service.create(request, image)
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @Valid @RequestPart HeroSectionRequest request,
            @RequestPart(required = false) MultipartFile image) {

        return ResponseEntity.ok(
            ResponseUtil.success(
                "Hero section updated",
                service.update(id, request, image)
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(
            ResponseUtil.success("Hero section deleted")
        );
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Hero sections fetched",
                service.getAllForAdmin()
            )
        );
    }
    
    @GetMapping("/heroes")
    public ResponseEntity<ApiResponse<HeroSectionStatsResponse>> heroStats() {
        return ResponseUtil.success(
                "Hero section stats fetched successfully",
                service.getHeroStats()
        );
    }
}
