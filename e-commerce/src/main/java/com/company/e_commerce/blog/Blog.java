package com.company.e_commerce.blog;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Blog title
    @Column(nullable = false)
    private String title;

    // Question / heading type
    @Column(nullable = false)
    private String question;

    // Rich text HTML from editor
    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // Cover image (list page)
    @Column(nullable = false)
    private String coverImageUrl;

    @Column(nullable = false)
    private String coverImagePublicId;

    @Builder.Default
    private Boolean isActive = true;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(
            mappedBy = "blog",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<BlogImage> images = new ArrayList<>();
}
