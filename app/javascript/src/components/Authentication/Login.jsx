import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import LoginForm from "./Form/Login";

import { setAuthHeaders } from "../../apis/axios";
import { useLogin } from "../../hooks/reactQueries/useAuthApi";
import routes from "../../routes";
import { setToLocalStorage } from "../../utils/storage";
import Title from "../commons/Title";

const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSuccess = response => {
    setToLocalStorage({
      authToken: response.authenticationToken,
      email: response.email.toLowerCase(),
      userId: response.id,
      userName: response.name,
    });
    setAuthHeaders();
    window.location.href = routes.root;
  };

  const { mutate, isLoading } = useLogin(handleSuccess);

  const handleSubmit = (payload, { resetFrom }) => {
    mutate(payload);
    resetFrom();
  };

  const handleSignupRedirect = () => {
    history.push(routes.auth.signup);
  };

  return (
    <div className=" mx-auto max-w-xl rounded-xl border px-4 py-8 shadow-md">
      <Title className="justify-center" titleText={t("titles.login")} />
      <div className="h-ful mx-auto max-w-80">
        <LoginForm {...{ handleSignupRedirect, handleSubmit, isLoading }} />
      </div>
    </div>
  );
};

export default Login;
