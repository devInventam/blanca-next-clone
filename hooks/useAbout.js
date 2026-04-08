import { useQuery } from "@tanstack/react-query";
import { getProjectByYearWithCategory } from "../services/aboutService";

export const useProjectByYearWithCategory = () => {
  return useQuery({
    queryKey: ["about", "project_by_year_with_category"],
    queryFn: getProjectByYearWithCategory,
  });
};

