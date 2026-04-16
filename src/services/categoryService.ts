import { CategoryResponse, CategoryRequest, CategoryStatsResponse, ApiResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/admin/categories";

const getToken = () => localStorage.getItem("admin_token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const categoryService = {
  getAll: async (): Promise<CategoryResponse[]> => {
    const res = await fetch(API_URL, { headers: headers() });
    const data: ApiResponse<CategoryResponse[]> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<CategoryResponse> => {
    const res = await fetch(`${API_URL}/${id}`, { headers: headers() });
    const data: ApiResponse<CategoryResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  create: async (request: CategoryRequest): Promise<CategoryResponse> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(request),
    });
    const data: ApiResponse<CategoryResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (id: number, request: CategoryRequest): Promise<CategoryResponse> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(request),
    });
    const data: ApiResponse<CategoryResponse> = await res.json();
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

  getStats: async (): Promise<CategoryStatsResponse> => {
    const res = await fetch(`${API_URL}/stats`, { headers: headers() });
    const data: ApiResponse<CategoryStatsResponse> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
