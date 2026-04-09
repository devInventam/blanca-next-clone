import { useMutation } from "@tanstack/react-query";
import { registerChannelPartner } from "../services/channelPartnerService";

export const useRegisterChannelPartner = () => {
  return useMutation({
    mutationFn: registerChannelPartner,
  });
};

