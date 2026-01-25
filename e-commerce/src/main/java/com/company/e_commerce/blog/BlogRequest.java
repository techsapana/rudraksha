package com.company.e_commerce.blog;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlogRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String question;

    // HTML string from editor
    @NotBlank
    private String content;
}
