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
import com.company.e_commerce.category.CategoryRequest;
import com.company.e_commerce.category.CategoryResponse;
import com.company.e_commerce.category.CategoryService;
import com.company.e_commerce.category.CategoryStatsResponse;
import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/categories")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminCategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> create(
            @Valid @RequestBody CategoryRequest request
    ) {
        CategoryResponse created = categoryService.create(request);
        return ResponseUtil.success("Category created successfully", created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request
    ) {
        CategoryResponse updated = categoryService.update(id, request);
        return ResponseUtil.success("Category updated successfully", updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseUtil.success("Category deleted successfully");
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAll() {
        List<CategoryResponse> categories = categoryService.getAll();
        return ResponseUtil.success("Category list fetched successfully", categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getById(@PathVariable Long id) {
        CategoryResponse category = categoryService.getById(id);
        return ResponseUtil.success("Category fetched successfully", category);
    }
    
    // in dashboard of admin 
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<CategoryStatsResponse>> categoryStats() {
        return ResponseUtil.success(
                "Category stats fetched successfully",
                categoryService.getCategoryStats()
        );
    }
}