import React from "react";

import LoginForm from "components/Authentication/Form/Login";
import Title from "components/commons/Title";
import { useLogin } from "hooks/reactQueries/useAuthApi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { mutate, isLoading } = useLogin();

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
