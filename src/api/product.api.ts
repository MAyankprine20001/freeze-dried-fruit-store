import axiosInstance from "./axiosInstance";

export const productApi = {
 getAll: async () => {
  const response = await axiosInstance.get("/products");
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
 uploadImage: async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.post("/upload/image", formData, {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  });
  return response.data;
 },
};
