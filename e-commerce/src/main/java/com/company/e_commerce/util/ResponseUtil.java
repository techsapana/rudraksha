package com.company.e_commerce.util;

import com.company.e_commerce.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    private ResponseUtil() {}

    // ✅ SUCCESS WITH DATA
    public static <T> ResponseEntity<ApiResponse<T>> success(String message, T data) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    // ✅ SUCCESS WITHOUT DATA (VOID SAFE)
    public static ResponseEntity<ApiResponse<Void>> success(String message) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(ApiResponse.<Void>builder()
                        .success(true)
                        .message(message)
                        .data(null)
                        .build());
    }

    // ❌ ERROR RESPONSE
    public static ResponseEntity<ApiResponse<Void>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .data(null)
                        .build());
    }
}