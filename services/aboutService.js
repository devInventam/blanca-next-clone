import { axiosInstance } from "../api/axiosInstance";

export const getProjectByYearWithCategory = async () => {
  const { data } = await axiosInstance.get(
    "/project/home/project_by_year_with_category"
  );
  return data;
};

