import { axiosInstance } from "../api/axiosInstance";

export const getSetting = async (params) => {
  const { data } = await axiosInstance.get("/setting", {
    params: {
      offset: 1,
      limit: 10,
      ...(params || {}),
    },
  });
  return data;
};

 