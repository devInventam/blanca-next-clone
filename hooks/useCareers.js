import { useMutation, useQuery } from "@tanstack/react-query";
import { getCareerCategories, getCareers, submitCareerApplication } from "../services/careerService";

export const useCareerCategories = (params) => {
  return useQuery({
    queryKey: ["career-categories", params],
    queryFn: () => getCareerCategories(params),
  });
};

export const useCareers = (params) => {
  return useQuery({
    queryKey: ["careers", params],
    queryFn: () => getCareers(params),
  });
};

export const useApplyCareer = () => {
  return useMutation({
    mutationFn: submitCareerApplication,
  });
};

