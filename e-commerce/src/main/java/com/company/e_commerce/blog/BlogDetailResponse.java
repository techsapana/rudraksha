package com.company.e_commerce.blog;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class BlogDetailResponse {

    private Long id;
    private String title;
    private String question;
    private String content; // HTML
    private String coverImageUrl;
    private List<String> images;
    private LocalDateTime createdAt;
}
