import { ProductResponse, ProductDetailResponse, ProductCreateRequest, ProductUpdateRequest, ProductStatsResponse, ApiResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/admin/products";

const getToken = () => localStorage.getItem("admin_token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const getMultipartHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const productService = {
  getAll: async (): Promise<ProductResponse[]> => {
    const res = await fetch(API_URL, { headers: headers() });
    const data: ApiResponse<ProductResponse[]> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<ProductResponse> => {
    const res = await fetch(`${API_URL}/${id}`, { headers: headers() });
    const data: ApiResponse<ProductResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getDetail: async (id: number): Promise<ProductDetailResponse> => {
    const res = await fetch(`${API_URL}/${id}`, { headers: headers() });
    if (!res.ok) throw new Error("Failed to fetch product detail");
    return res.json();
  },

  create: async (request: ProductCreateRequest, images: File[]): Promise<ProductResponse> => {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(request)], { type: "application/json" }));
    images.forEach((img) => formData.append("images", img));

    const res = await fetch(API_URL, {
      method: "POST",
      headers: getMultipartHeaders(),
      body: formData,
    });
    const data: ApiResponse<ProductResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (id: number, request: ProductUpdateRequest, images?: File[]): Promise<ProductResponse> => {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(request)], { type: "application/json" }));
    if (images) {
      images.forEach((img) => formData.append("images", img));
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getMultipartHeaders(),
      body: formData,
    });
    const data: ApiResponse<ProductResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    const data: ApiResponse<void> = await res.json();
    if (!data.success) throw new Error(data.message);
  },

  getStats: async (): Promise<ProductStatsResponse> => {
    const res = await fetch(`${API_URL}/stats`, { headers: headers() });
    const data: ApiResponse<ProductStatsResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};