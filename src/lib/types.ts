export interface CategoryRequest {
  name: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface CategoryStatsResponse {
  totalCategories: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  discountPercentage: number;
  discountedPrice: number;
  images: string[];
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  category: string;
  images: string[];
}
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  discountPercentage: number;
  discountedPrice: number;
  images: string[];
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  category: string;
  images: string[];
}

export interface ProductCreateRequest {
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  discountPercentage?: number;
  categoryId: number;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  longDescription?: string;
  price?: number;
  discountPercentage?: number;
  categoryId?: number;
}

export interface ProductStatsResponse {
  totalProducts: number;
  activeProducts: number;
  totalValue: number;
}

export interface GalleryResponse {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}
