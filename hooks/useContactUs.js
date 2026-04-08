import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "../services/contactService";

export const useContactUs = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  });
};

