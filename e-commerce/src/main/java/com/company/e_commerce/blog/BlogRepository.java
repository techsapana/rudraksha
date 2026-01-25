package com.company.e_commerce.blog;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findByIsActiveTrueOrderByCreatedAtDesc();
}
