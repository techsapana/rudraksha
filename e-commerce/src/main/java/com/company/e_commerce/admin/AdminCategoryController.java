package com.company.e_commerce.admin;

import java.util.List;

import org.apache.tomcat.util.http.ResponseUtil;
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

import com.company.e_commerce.category.CategoryRequest;
import com.company.e_commerce.category.CategoryResponse;
import com.company.e_commerce.category.CategoryService;
import com.ecommerce.app.payload.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> create(
        @Valid @RequestBody CategoryRequest request
    ) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Category created successfully",
                categoryService.create(request)
            )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> update(
        @PathVariable Long id,
        @Valid @RequestBody CategoryRequest request
    ) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Category updated successfully",
                categoryService.update(id, request)
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        categoryService.delete(id);

        return ResponseEntity.ok(
            ResponseUtil.success("Category deleted successfully")
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAll() {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Category list fetched successfully",
                categoryService.getAll()
            )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
            ResponseUtil.success(
                "Category fetched successfully",
                categoryService.getById(id)
            )
        );
    }
}
