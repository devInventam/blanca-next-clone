import { useQuery } from "@tanstack/react-query";
import { getOtherField } from "../services/otherFieldService";

export const useOtherField = () => {
  return useQuery({
    queryKey: ["other_field"],
    queryFn: getOtherField,
  });
};

