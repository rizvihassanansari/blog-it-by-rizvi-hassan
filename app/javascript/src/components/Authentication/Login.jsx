import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import LoginForm from "./Form/Login";

import routes from "../../routes";
import Title from "../commons/Title";

const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();

  // const handleSuccess = () => {
  //   history.push(routes.root);
  // };

  // const handleSubmit = () => {};

  const handleSignupRedirect = () => {
    history.push(routes.auth.signup);
  };

  return (
    <div className=" mx-auto max-w-xl rounded-xl border px-4 py-8 shadow-md">
      <Title className="justify-center" titleText={t("titles.login")} />
      <div className="h-ful mx-auto max-w-80">
        <LoginForm {...{ handleSignupRedirect }} />
      </div>
    </div>
  );
};

export default Login;
