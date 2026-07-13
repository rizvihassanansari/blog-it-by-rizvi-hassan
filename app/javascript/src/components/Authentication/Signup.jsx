import React from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import SignupForm from "./Form/Signup";

import { useSignup } from "../../hooks/reactQueries/useAuthApi";
import routes from "../../routes";
import Title from "../commons/Title";

const Signup = () => {
  const history = useHistory();

  const handleSuccess = () => {
    history.push(routes.root);
  };
  const { mutate } = useSignup(handleSuccess);

  const handleSubmit = payload => {
    mutate(payload);
  };

  const handleLoginRedirect = () => {
    history.push(routes.auth.login);
  };

  return (
    <div className=" mx-auto max-w-xl rounded-xl border px-4 py-8 shadow-md">
      <Title className="justify-center" titleText="Signup" />
      <div className="h-ful mx-auto max-w-80">
        <SignupForm {...{ handleSubmit, handleLoginRedirect }} />
      </div>
    </div>
  );
};

export default Signup;
