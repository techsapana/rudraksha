import { ApiResponse } from "@/lib/types";

export interface GalleryImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isActive?: boolean;
}

const API_URL = "http://localhost:8090/api/gallery";

export const galleryApi = {
  getAll: async (): Promise<GalleryImage[]> => {
    const res = await fetch(API_URL);
    const data: ApiResponse<GalleryImage[]> = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};