import { axiosInstance } from "../api/axiosInstance"

export const getTestimonials = async (params) => {
  const { data } = await axiosInstance.get("/testimonial", {
    params: params
  })

  return data;
}