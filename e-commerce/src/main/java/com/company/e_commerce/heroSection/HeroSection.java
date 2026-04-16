package com.company.e_commerce.heroSection;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gallery_images",
    indexes = {
        @Index(name = "idx_active", columnList = "is_active")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeroSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String imagePublicId;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    // Optional: control display order (VERY IMPORTANT for UI)
    @Column
    private Integer displayOrder;
}
