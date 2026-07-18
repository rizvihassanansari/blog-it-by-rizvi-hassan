import React from "react";

import SignupForm from "components/Authentication/Form/Signup";
import Title from "components/commons/Title";
import { useSignup } from "hooks/reactQueries/useAuthApi";
import { useFetchOrganizations } from "hooks/reactQueries/useOrganizations";
import { omit } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

const Signup = () => {
  const history = useHistory();
  const { t } = useTranslation();

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
      <Title className="justify-center" titleText={t("titles.signup")} />
      <div className="h-ful mx-auto max-w-80">
        <SignupForm {...{ handleSubmit, handleLoginRedirect, organizations }} />
      </div>
    </div>
  );
};

export default Signup;
