import { axiosInstance } from "../api/axiosInstance";

export const getCategories = async (params = {}) => {
  const { data } = await axiosInstance.get("/category", {
    params,
  });

  return data;
};

