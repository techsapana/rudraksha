package com.company.e_commerce.heroSection;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HeroSectionRepository
        extends JpaRepository<HeroSection, Long> {

    List<HeroSection> findByIsActiveTrue();
}
