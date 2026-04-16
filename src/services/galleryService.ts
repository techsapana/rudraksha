import { ApiResponse } from "@/lib/types";

export interface GalleryResponse {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface GalleryUpdateRequest {
  displayOrder?: number;
  isActive?: boolean;
}

const API_URL = "http://localhost:8090/api/admin/gallery";

const getToken = () => localStorage.getItem("admin_token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const getMultipartHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const galleryService = {
  getAll: async (): Promise<GalleryResponse[]> => {
    const res = await fetch(API_URL, { headers: headers() });
    const data: ApiResponse<GalleryResponse[]> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  createBulk: async (images: File[], displayOrders?: number[]): Promise<GalleryResponse[]> => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    if (displayOrders) {
      displayOrders.forEach((order) => formData.append("displayOrders", order.toString()));
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: getMultipartHeaders(),
      body: formData,
    });
    const data: ApiResponse<GalleryResponse[]> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  updateMeta: async (id: number, request: GalleryUpdateRequest): Promise<GalleryResponse> => {
    const params = new URLSearchParams();
    if (request.displayOrder !== undefined) params.append("displayOrder", request.displayOrder.toString());
    if (request.isActive !== undefined) params.append("isActive", request.isActive.toString());

    const res = await fetch(`${API_URL}/${id}?${params.toString()}`, {
      method: "PATCH",
      headers: headers(),
    });
    const data: ApiResponse<GalleryResponse> = await res.json();
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
};
