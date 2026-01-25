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

import com.company.e_commerce.tag.TagRequest;
import com.company.e_commerce.tag.TagResponse;
import com.company.e_commerce.tag.TagService;
import com.company.e_commerce.util.ResponseUtil;
import com.ecommerce.app.payload.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/tags")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminTagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<ApiResponse<TagResponse>> create(
        @Valid @RequestBody TagRequest request
    ) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Tag created successfully",
                tagService.create(request)
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> update(
        @PathVariable Long id,
        @Valid @RequestBody TagRequest request
    ) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Tag updated successfully",
                tagService.update(id, request)
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        tagService.delete(id);

        return ResponseEntity.ok(
            ResponseUtil.success("Tag deleted successfully")
        );
    }

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

