package com.company.e_commerce.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.e_commerce.tag.TagResponse;
import com.company.e_commerce.tag.TagService;
import com.company.e_commerce.util.ResponseUtil;
import com.ecommerce.app.payload.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TagResponse>>> getAll() {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Tag list fetched successfully",
                tagService.getAll()
            )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Tag fetched successfully",
                tagService.getById(id)
            )
        );
    }
}

