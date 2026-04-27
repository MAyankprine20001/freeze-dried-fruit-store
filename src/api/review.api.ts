import axiosInstance from "./axiosInstance";

export const reviewApi = {
 getProductReviews: async (productId: string) => {
  const response = await axiosInstance.get(`/reviews/product/${productId}`);
  return response.data;
 },
 addReview: async (productId: string, formData: FormData) => {
  // Sending FormData because of the image
  const response = await axiosInstance.post(
   `/reviews/product/${productId}`,
   formData,
   {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   }
  );
  return response.data;
 },
};
