import { axiosInstance } from "./axiosInstance";

export const getSetting = async (params) => {
  const { data } = await axiosInstance.get("/setting", {
    params: {
      offset: 1,
      limit: 10,
      ...(params || {}),
    },
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return data;
};

 