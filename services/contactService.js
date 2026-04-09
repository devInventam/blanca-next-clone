import { axiosInstance } from "./axiosInstance";

export const sendContactMessage = async (payload) => {
  const { data } = await axiosInstance.post("/contact-us", payload);
  return data;
};

