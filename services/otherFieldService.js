import { axiosInstance } from "./axiosInstance";

export const getOtherField = async () => {
  const { data } = await axiosInstance.get("/other-field");
  return data;
};

