import { axiosInstance } from "./axiosInstance"

export const getTestimonials = async (params) => {
  const { data } = await axiosInstance.get("/testimonial", {
    params: params
  })

  return data;
}