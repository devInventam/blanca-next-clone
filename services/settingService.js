import { axiosInstance } from "./axiosInstance";

export const getSetting = async (params) => {
  const { data } = await axiosInstance.get("/setting", {
    params: {
      offset: 1,
      limit: 10,
      ...(params || {}),
    },
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  return data;
};

 