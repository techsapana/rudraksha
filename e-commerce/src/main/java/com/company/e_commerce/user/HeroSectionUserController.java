package com.company.e_commerce.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.e_commerce.heroSection.HeroSectionResponse;
import com.company.e_commerce.heroSection.HeroSectionService;
import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.util.ResponseUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class HeroSectionUserController {

    private final HeroSectionService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<HeroSectionResponse>>> getGallery() {

        return ResponseUtil.success(
                "Gallery fetched successfully",
                service.getAllForUser()
        );
    }
}