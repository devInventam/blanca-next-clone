import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProjectById,
  getProjectsWithFilter,
  getProjectLocations,
  sendEnquiry,
} from "../services/projectService";

export const useProjects = (params) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
};

export const useProjectById = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });
};

export const useProjectsWithFilter = (params) => {
  return useQuery({
    queryKey: ["projects-filter", params],
    queryFn: () => getProjectsWithFilter(params),
  });
};

export const useProjectLocations = () => {
  return useQuery({
    queryKey: ["project-locations"],
    queryFn: getProjectLocations,
  });
};

export const useEnquire = () => {
  return useMutation({
    mutationFn: sendEnquiry,
  });
};