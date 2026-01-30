package com.company.e_commerce.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.blog.BlogDetailResponse;
import com.company.e_commerce.blog.BlogListResponse;
import com.company.e_commerce.blog.BlogRequest;
import com.company.e_commerce.blog.BlogService;
import com.company.e_commerce.blog.BlogStatsResponse;
import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/blogs")
@RequiredArgsConstructor
public class BlogAdminController {

    private final BlogService blogService;

    // ✅ CREATE BLOG
    @PostMapping
    public ResponseEntity<ApiResponse<BlogDetailResponse>> create(
            @Valid @RequestPart("data") BlogRequest request,
            @RequestPart("coverImage") MultipartFile coverImage,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        BlogDetailResponse created = blogService.create(request, coverImage, images);
        return ResponseUtil.success("Blog created successfully", created);
    }

    // ✅ UPDATE BLOG
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDetailResponse>> update(
            @PathVariable Long id,
            @Valid @RequestPart("data") BlogRequest request,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        BlogDetailResponse updated = blogService.update(id, request, coverImage, images);
        return ResponseUtil.success("Blog updated successfully", updated);
    }

    // ✅ DELETE BLOG
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseUtil.success("Blog deleted successfully");
    }

    // ✅ GET ALL BLOGS (ADMIN)
    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogListResponse>>> getAll() {
        return ResponseUtil.success(
                "Blogs fetched successfully",
                blogService.getAllForUser()
        );
    }

    // ✅ GET BLOG BY ID (ADMIN)
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDetailResponse>> getById(@PathVariable Long id) {
        return ResponseUtil.success(
                "Blog fetched successfully",
                blogService.getById(id)
        );
    }
    
    @GetMapping("/blogs")
    public ResponseEntity<ApiResponse<BlogStatsResponse>> blogStats() {
        return ResponseUtil.success(
                "Blog stats fetched successfully",
                blogService.getBlogStats()
        );
    }
}
