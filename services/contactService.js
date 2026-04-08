import { axiosInstance } from "../api/axiosInstance";

export const sendContactMessage = async (payload) => {
  const { data } = await axiosInstance.post("/contact-us", payload);
  return data;
};

