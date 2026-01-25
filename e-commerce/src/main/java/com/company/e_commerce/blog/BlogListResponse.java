package com.company.e_commerce.blog;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BlogListResponse {

    private Long id;
    private String title;
    private String question;
    private String coverImageUrl;
    private LocalDateTime createdAt;
}
