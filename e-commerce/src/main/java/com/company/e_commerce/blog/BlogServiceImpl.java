package com.company.e_commerce.blog;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.image.CloudinaryImageResult;
import com.company.e_commerce.image.ImageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final ImageService imageService;

    @Override
    public BlogDetailResponse create(
            BlogRequest request,
            MultipartFile coverImage,
            List<MultipartFile> images) {

        var cover = imageService.uploadBlogCover(coverImage);
        var contentImages = imageService.uploadBlogImages(images);

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .question(request.getQuestion())
                .content(request.getContent())
                .coverImageUrl(cover.getImageUrl())
                .coverImagePublicId(cover.getPublicId())
                .build();

        contentImages.forEach(img ->
                blog.getImages().add(
                        BlogImage.builder()
                                .imageUrl(img.getImageUrl())
                                .publicId(img.getPublicId())
                                .blog(blog)
                                .build()
                )
        );

        return mapToDetail(blogRepository.save(blog));
    }

    @Override
    public BlogDetailResponse update(
            Long id,
            BlogRequest request,
            MultipartFile coverImage,
            List<MultipartFile> images) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        // Update basic fields
        blog.setTitle(request.getTitle());
        blog.setQuestion(request.getQuestion());
        blog.setContent(request.getContent());

        // Replace cover image if provided
        if (coverImage != null && !coverImage.isEmpty()) {
            // delete old cover image from cloudinary
            imageService.deleteImages(List.of(blog.getCoverImagePublicId()));

            // upload new cover
            CloudinaryImageResult newCover = imageService.uploadBlogCover(coverImage);
            blog.setCoverImageUrl(newCover.getImageUrl());
            blog.setCoverImagePublicId(newCover.getPublicId());
        }

        // Replace additional images if provided
        if (images != null && !images.isEmpty()) {
            // delete old blog images from cloudinary
            List<String> oldPublicIds = blog.getImages().stream()
                    .map(BlogImage::getPublicId)
                    .toList();

            imageService.deleteImages(oldPublicIds);

            // clear old images from DB
            blog.getImages().clear();

            // upload new images
            List<CloudinaryImageResult> uploadedImages = imageService.uploadBlogImages(images);
            uploadedImages.forEach(img -> blog.getImages().add(
                    BlogImage.builder()
                            .imageUrl(img.getImageUrl())
                            .publicId(img.getPublicId())
                            .blog(blog)
                            .build()
            ));
        }

        // Save and return updated blog
        return mapToDetail(blogRepository.save(blog));
    }
    
    @Override
    public void delete(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        imageService.deleteImages(
                blog.getImages().stream()
                        .map(BlogImage::getPublicId)
                        .toList()
        );

        imageService.deleteImages(
                List.of(blog.getCoverImagePublicId())
        );

        blog.setIsActive(false);
        blogRepository.save(blog);
    }

    @Override
    public List<BlogListResponse> getAllForUser() {
        return blogRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToList)
                .toList();
    }

    @Override
    public BlogDetailResponse getById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return mapToDetail(blog);
    }

    private BlogListResponse mapToList(Blog blog) {
        return BlogListResponse.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .question(blog.getQuestion())
                .coverImageUrl(blog.getCoverImageUrl())
                .createdAt(blog.getCreatedAt())
                .build();
    }

    private BlogDetailResponse mapToDetail(Blog blog) {
        return BlogDetailResponse.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .question(blog.getQuestion())
                .content(blog.getContent())
                .coverImageUrl(blog.getCoverImageUrl())
                .images(
                        blog.getImages().stream()
                                .map(BlogImage::getImageUrl)
                                .toList()
                )
                .createdAt(blog.getCreatedAt())
                .build();
    }
}
