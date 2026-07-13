import React from "react";

import { Button } from "@bigbinary/neetoui";
import {
  Form as FormikForm,
  Input,
  Button as FormikButton,
  Select,
} from "@bigbinary/neetoui/formik";

import {
  SIGNUP_FORM_INITIAL_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Signup = ({ handleSubmit, handleLoginRedirect, organizations }) => {
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
        label="Name"
        name="name"
        placeholder="Oliver"
        type="text"
      />
      <Input
        required
        className="w-full"
        label="Email"
        name="email"
        placeholder="oliver@example.com"
        type="email"
      />
      <Select
        required
        className="w-full"
        label="Organization"
        name="organization"
        options={organizationOptions}
        placeholder="Select an organization"
      />
      <Input
        required
        className="w-full"
        label="Password"
        name="password"
        placeholder="·······"
        type="password"
      />
      <Input
        required
        className="w-full"
        label="Password confirmation"
        name="passwordConfirmation"
        placeholder="·······"
        type="password"
      />
      <FormikButton
        className="black-button--primary w-full justify-center"
        label="Register"
        type="submit"
      />
      <Button
        label="New user? Login"
        style="link"
        onClick={() => handleLoginRedirect()}
      />
    </FormikForm>
  );
};

export default Signup;
