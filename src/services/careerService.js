import { axiosInstance } from "../api/axiosInstance";

export const getCareerCategories = async (params = {}) => {
  const { data } = await axiosInstance.get("/career-category", {
    params,
  });

  return data;
};

export const getCareers = async (params = {}) => {
  const { data } = await axiosInstance.get("/career", {
    params,
  });

  return data;
};

export const submitCareerApplication = async (payload) => {
  const { data } = await axiosInstance.post("/career", payload);
  return data;
};

