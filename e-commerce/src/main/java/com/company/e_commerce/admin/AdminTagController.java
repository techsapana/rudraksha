package com.company.e_commerce.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.tag.TagRequest;
import com.company.e_commerce.tag.TagResponse;
import com.company.e_commerce.tag.TagService;
import com.company.e_commerce.tag.TagStatsResponse;
import com.company.e_commerce.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/tags")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminTagController {

    private final TagService tagService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<TagResponse>> create(
            @Valid @RequestBody TagRequest request
    ) {
        TagResponse response = tagService.create(request);
        return ResponseUtil.success("Tag created successfully", response);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody TagRequest request
    ) {
        TagResponse response = tagService.update(id, request);
        return ResponseUtil.success("Tag updated successfully", response);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {

        tagService.delete(id);

        return ResponseUtil.success("Tag deleted successfully");
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<TagResponse>>> getAll() {
        return ResponseUtil.success(
                "Tag list fetched successfully",
                tagService.getAll()
        );
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> getById(
            @PathVariable Long id
    ) {
        return ResponseUtil.success(
                "Tag fetched successfully",
                tagService.getById(id)
        );
    }
    
    @GetMapping("/tags")
    public ResponseEntity<ApiResponse<TagStatsResponse>> tagStats() {
        return ResponseUtil.success(
                "Tag stats fetched successfully",
                tagService.getTagStats()
        );
    }
}
