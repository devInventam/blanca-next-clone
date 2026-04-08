import { axiosInstance } from "../api/axiosInstance";

export const registerChannelPartner = async (payload) => {
  const { data } = await axiosInstance.post("/channel-partner", payload);
  return data;
};

