import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../services/settingService";

export const useSetting = (params) => {
  return useQuery({
    queryKey: ["setting", params],
    queryFn: () => getSetting(params),
  });
};
