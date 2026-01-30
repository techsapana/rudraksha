package com.company.e_commerce.blog;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface BlogService {

    BlogDetailResponse create(
            BlogRequest request,
            MultipartFile coverImage,
            List<MultipartFile> images
    );

    BlogDetailResponse update(
            Long id,
            BlogRequest request,
            MultipartFile coverImage,
            List<MultipartFile> images
    );
    BlogStatsResponse getBlogStats();

    void delete(Long id);

    List<BlogListResponse> getAllForUser();

    BlogDetailResponse getById(Long id);
}
