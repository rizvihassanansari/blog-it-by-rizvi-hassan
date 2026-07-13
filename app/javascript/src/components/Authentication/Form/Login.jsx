import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form as FormikForm, Input } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Login = ({ handleSubmit, handleSignupRedirect, isLoading }) => {
  const { t } = useTranslation();

  return (
    <FormikForm
      className="mt-10 flex flex-col items-center gap-6"
      formikProps={{
        initialValues: LOGIN_FORM_INITIAL_VALUES,
        validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <Input
        required
        className="w-full"
        label={t("labels.email")}
        name="email"
        placeholder={t("placeholders.email")}
        type="email"
      />
      <Input
        required
        className="w-full"
        label={t("labels.password")}
        name="password"
        placeholder={t("placeholders.password")}
        type="password"
      />
      <Button
        className="black-button--primary w-full justify-center"
        label={t("labels.login")}
        loading={isLoading}
        type="submit"
      />
      <Button
        label={t("labels.newUser")}
        style="link"
        onClick={() => handleSignupRedirect()}
      />
    </FormikForm>
  );
};

export default Login;
