import axiosInstance from "./axiosInstance";

async function postUploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export interface AdminCatalogResponse {
  success: boolean;
  data: any[];
  nextCursor: string | null;
  hasNextPage: boolean;
  limit: number;
  total: number;
}

export const productApi = {
 getAll: async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
 },
 getAdminCatalog: async (params: {
   limit?: number;
   cursor?: string | null;
   search?: string;
   stock?: string;
 } = {}) => {
  const q = new URLSearchParams();
  q.set("limit", String(params.limit ?? 20));
  if (params.cursor) q.set("cursor", params.cursor);
  if (params.search) q.set("search", params.search);
  if (params.stock) q.set("stock", params.stock);
  const response = await axiosInstance.get<AdminCatalogResponse>(
    `/products/admin/catalog?${q.toString()}`
  );
  return response.data;
 },
 getById: async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
 },
 create: async (data: any) => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
 },
 update: async (id: string, data: any) => {
  const response = await axiosInstance.put(`/products/${id}`, data);
  return response.data;
 },
 delete: async (id: string) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
 },
 seed: async (data: any[]) => {
  const response = await axiosInstance.post("/products/seed", data);
  return response.data;
 },
 uploadImage: (file: File) => postUploadImage(file),
 /** Sequential uploads preserving order; mirrors uploadImage response shape per file. */
 uploadImages: async (files: File[]) => {
  const urls: string[] = [];
  for (const file of files) {
   const res = await postUploadImage(file);
   urls.push(res.data.url);
  }
  return { data: { urls } };
 },
};
