package com.company.e_commerce.util;

import com.ecommerce.app.payload.ApiResponse;

public final class ResponseUtil {

    // prevent instantiation
    private ResponseUtil() {}

    /**
     * Success response with data
     */	
    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    /**
     * Success response without data (DELETE, etc.)
     */
    public static ApiResponse<Void> success(String message) {
        return ApiResponse.<Void>builder()
                .success(true)
                .message(message)
                .data(null)
                .build();
    }

    /**
     * Failure response
     */
    public static ApiResponse<Void> failure(String message) {
        return ApiResponse.<Void>builder()
                .success(false)
                .message(message)
                .data(null)
                .build();
    }
}

