package com.company.e_commerce.category;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);
    CategoryStatsResponse getCategoryStats();

    List<CategoryResponse> getAll();

    CategoryResponse getById(Long id);
}

