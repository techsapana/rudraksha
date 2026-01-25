package com.company.e_commerce.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.e_commerce.heroSection.HeroSectionService;
import com.company.e_commerce.util.ResponseUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hero")
@RequiredArgsConstructor
public class HeroSectionUserController {

    private final HeroSectionService service;

    @GetMapping
    public ResponseEntity<?> getHeroSections() {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Hero sections fetched",
                service.getAllForUser()
            )
        );
    }
}

