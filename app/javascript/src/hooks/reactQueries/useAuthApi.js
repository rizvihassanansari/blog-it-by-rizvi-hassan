import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useSignup = handleSuccess =>
  useMutation({
    mutationFn: payload => authApi.signup(payload),
    onSuccess: handleSuccess,
  });
