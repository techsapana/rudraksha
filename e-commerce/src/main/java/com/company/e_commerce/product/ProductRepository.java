package com.company.e_commerce.product;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ProductRepository
        extends JpaRepository<Product, Long>,
                JpaSpecificationExecutor<Product> {

    // ✅ USER SIDE – ACTIVE PRODUCTS
    List<Product> findByIsActiveTrue();

    Page<Product> findByIsActiveTrue(Pageable pageable);

    // ✅ ADMIN SIDE – ALL PRODUCTS
    Page<Product> findAll(Pageable pageable);

    // ✅ CATEGORY FILTER
    Page<Product> findByCategory_IdAndIsActiveTrue(
            Long categoryId,
            Pageable pageable
    );

    // ✅ TAG FILTER
    Page<Product> findByTags_IdAndIsActiveTrue(
            Long tagId,
            Pageable pageable
    );

    // ✅ SEARCH BY NAME (CASE INSENSITIVE)
    Page<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(
            String keyword,
            Pageable pageable
    );

    // ✅ EXISTS CHECK (OPTIONAL – for uniqueness validation)
    boolean existsByNameIgnoreCase(String name);
    
    Optional<Product> findTopByOrderBySoldCountDesc();
}

