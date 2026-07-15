import React from "react";

import { Button } from "@bigbinary/neetoui";
import {
  Form as FormikForm,
  Input,
  Button as FormikButton,
  Select,
} from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  SIGNUP_FORM_INITIAL_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Signup = ({ handleSubmit, handleLoginRedirect, organizations }) => {
  const { t } = useTranslation();

  const organizationOptions = organizations.map(organization => ({
    label: organization.name,
    value: organization.id,
  }));

  return (
    <FormikForm
      className="mt-10 flex flex-col items-center gap-6"
      formikProps={{
        initialValues: SIGNUP_FORM_INITIAL_VALUES,
        validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <Input
        required
        className="w-full"
        label={t("labels.name")}
        name="name"
        placeholder={t("placeholders.name")}
        type="text"
      />
      <Input
        required
        className="w-full"
        label={t("labels.email")}
        name="email"
        placeholder={t("placeholders.email")}
        type="email"
      />
      <Select
        required
        className="w-full"
        defaultValue={organizationOptions[0]}
        label={t("labels.organization")}
        name="organization"
        options={organizationOptions}
        placeholder={t("placeholders.organization")}
      />
      <Input
        required
        className="w-full"
        label={t("labels.password")}
        name="password"
        placeholder={t("placeholders.password")}
        type="password"
      />
      <Input
        required
        className="w-full"
        label={t("labels.passwordConfirm")}
        name="passwordConfirmation"
        placeholder={t("placeholders.password")}
        type="password"
      />
      <FormikButton
        className="black-button--primary w-full justify-center"
        label={t("labels.signup")}
        type="submit"
      />
      <Button
        label={t("labels.existingUser")}
        style="link"
        onClick={() => handleLoginRedirect()}
      />
    </FormikForm>
  );
};

export default Signup;
