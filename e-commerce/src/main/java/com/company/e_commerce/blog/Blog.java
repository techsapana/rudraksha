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

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String question;

    @Column(columnDefinition = "TEXT", nullable = false)  // Keep this for TEXT type
    private String content;

    @Column(nullable = false)
    private String coverImageUrl;

    @Column(nullable = false)
    private String coverImagePublicId;

    @Builder.Default
    private Boolean isActive = true;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogImage> images = new ArrayList<>();

    // ────────────────────────────────────────────────
    // ADD THIS defensive getter (most important line)
    public List<BlogImage> getImages() {
        if (this.images == null) {
            this.images = new ArrayList<>();
        }
        return this.images;
    }

    // Optional but good practice: safe setter
    public void setImages(List<BlogImage> images) {
        this.images = (images != null) ? new ArrayList<>(images) : new ArrayList<>();
    }
    // ────────────────────────────────────────────────
}
