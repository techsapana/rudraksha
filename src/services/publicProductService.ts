import { ProductResponse, ProductDetailResponse, ApiResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/products";

export const publicProductService = {
  getAll: async (): Promise<ProductResponse[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data;
    }
    if (json.success === false) throw new Error(json.message || "Failed to fetch products");
    return json;
  },

  getDetail: async (id: number): Promise<ProductDetailResponse> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status} - ${res.statusText}`);
    const json = await res.json();
    console.log("Product detail API response:", json);
    if (json.data) {
      return json.data;
    }
    if (json.success === false) throw new Error(json.message || "Failed to fetch product");
    return json;
  },
};