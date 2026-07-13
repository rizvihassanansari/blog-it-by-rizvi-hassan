import React from "react";

import { omit } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import SignupForm from "./Form/Signup";

import { useSignup } from "../../hooks/reactQueries/useAuthApi";
import { useFetchOrganizations } from "../../hooks/reactQueries/useOrganizations";
import routes from "../../routes";
import Title from "../commons/Title";

const Signup = () => {
  const history = useHistory();

  const { data: { organizations = [] } = {} } = useFetchOrganizations();

  const handleSuccess = () => {
    history.push(routes.root);
  };
  const { mutate } = useSignup(handleSuccess);

  const handleSubmit = payload => {
    const modifiedPayload = omit(["organization"], {
      ...payload,
      ["organizationId"]: payload.organization.value,
    });
    mutate(modifiedPayload);
  };

  const handleLoginRedirect = () => {
    history.push(routes.auth.login);
  };

  return (
    <div className=" mx-auto max-w-xl rounded-xl border px-4 py-8 shadow-md">
      <Title className="justify-center" titleText="Signup" />
      <div className="h-ful mx-auto max-w-80">
        <SignupForm {...{ handleSubmit, handleLoginRedirect, organizations }} />
      </div>
    </div>
  );
};

export default Signup;
