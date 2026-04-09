import { axiosInstance } from "./axiosInstance";

export const registerChannelPartner = async (payload) => {
  const { data } = await axiosInstance.post("/channel-partner", payload);
  return data;
};

