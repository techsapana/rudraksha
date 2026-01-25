package com.company.e_commerce.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.blog.BlogDetailResponse;
import com.company.e_commerce.blog.BlogRequest;
import com.company.e_commerce.blog.BlogService;
import com.company.e_commerce.util.ResponseUtil;
import com.ecommerce.app.payload.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/blogs")
@RequiredArgsConstructor
public class BlogAdminController {

    private final BlogService blogService;

    @PostMapping
    public ResponseEntity<ApiResponse<BlogDetailResponse>> create(
            @Valid @RequestPart BlogRequest request,
            @RequestPart MultipartFile coverImage,
            @RequestPart(required = false) List<MultipartFile> images) {

        return ResponseEntity.ok(
            ResponseUtil.success(
                "Blog created",
                blogService.create(request, coverImage, images)
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDetailResponse>> update(
            @PathVariable Long id,
            @Valid @RequestPart BlogRequest request,
            @RequestPart(required = false) MultipartFile coverImage,
            @RequestPart(required = false) List<MultipartFile> images) {

        BlogDetailResponse updated = blogService.update(id, request, coverImage, images);

        return ResponseEntity.ok(
                ResponseUtil.success("Blog updated successfully", updated)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.ok(
            ResponseUtil.success("Blog deleted")
        );
    }
}
