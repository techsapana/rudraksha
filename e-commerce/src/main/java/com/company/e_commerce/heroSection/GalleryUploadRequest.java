package com.company.e_commerce.heroSection;

import java.util.List;

import lombok.Data;

@Data
public class GalleryUploadRequest {

    private List<Integer> displayOrders; // optional (same index as images)
}
