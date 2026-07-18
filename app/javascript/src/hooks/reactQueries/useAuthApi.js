import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import { useMutation } from "react-query";
import routes from "routes";
import { setToLocalStorage } from "utils/storage";

export const useSignup = handleSuccess =>
  useMutation({
    mutationFn: payload => authApi.signup(payload),
    onSuccess: handleSuccess,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: payload => authApi.login(payload),
    onSuccess: ({ user }) => {
      setToLocalStorage({
        authToken: user.authenticationToken,
        email: user.email.toLowerCase(),
        userId: user.id,
        userName: user.name,
      });
      setAuthHeaders();
      window.location.href = routes.root;
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = routes.root;
    },
  });
