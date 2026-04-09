import { axiosInstance } from "./axiosInstance";

export const getCategories = async (params = {}) => {
  const { data } = await axiosInstance.get("/category", {
    params,
  });

  return data;
};

