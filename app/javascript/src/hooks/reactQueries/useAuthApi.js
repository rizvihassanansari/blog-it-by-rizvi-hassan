import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useSignup = handleSuccess =>
  useMutation({
    mutationFn: payload => authApi.signup(payload),
    onSuccess: handleSuccess,
  });

export const useLogin = handleSuccess =>
  useMutation({
    mutationFn: payload => authApi.login(payload),
    onSuccess: handleSuccess,
  });
