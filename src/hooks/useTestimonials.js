import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../services/testimonialService";

export const useTestimonials = (params) => {
  return useQuery({
    queryKey: ["testimonials", params],
    queryFn: () => getTestimonials(params),
  });
};