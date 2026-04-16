package com.company.e_commerce.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.company.e_commerce.heroSection.HeroSectionResponse;
import com.company.e_commerce.heroSection.HeroSectionService;
import com.company.e_commerce.payload.ApiResponse;
import com.company.e_commerce.util.ResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin/gallery")
@RequiredArgsConstructor
@Slf4j
public class HeroSectionAdminController {

    private final HeroSectionService service;

    // ✅ BULK UPLOAD
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<List<HeroSectionResponse>>> createBulk(
            @RequestPart List<MultipartFile> images,
            @RequestParam(required = false) List<Integer> displayOrders
    ) {

        log.info("Uploading {} gallery images", images.size());

        return ResponseUtil.success(
                "Gallery images uploaded successfully",
                service.createBulk(images, displayOrders)
        );
    }

    //  UPDATE METADATA (order + active)
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<HeroSectionResponse>> updateMeta(
            @PathVariable Long id,
            @RequestParam(required = false) Integer displayOrder,
            @RequestParam(required = false) Boolean isActive
    ) {

        log.info("Updating gallery image with id {}", id);

        return ResponseUtil.success(
                "Gallery image updated successfully",
                service.updateMeta(id, displayOrder, isActive)
        );
    }

    //  DELETE IMAGE (FIXED VOID TYPE ISSUE)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        log.info("Deleting gallery image with id {}", id);

        service.delete(id);

        return ResponseUtil.success("Gallery image deleted successfully");
    }

    //  ADMIN VIEW (ALL IMAGES)
    @GetMapping
    public ResponseEntity<ApiResponse<List<HeroSectionResponse>>> getAll() {

        return ResponseUtil.success(
                "Gallery images fetched successfully",
                service.getAllForAdmin()
        );
    }
}