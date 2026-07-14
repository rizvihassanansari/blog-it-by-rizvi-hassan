import React, { forwardRef } from "react";

import {
  Form as FormikForm,
  Input,
  Textarea,
  Select,
} from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
  MAX_DESCRIPTION_LENGTH,
} from "./constants";

// eslint-disable-next-line no-unused-vars
const Form = forwardRef(
  (
    {
      handleSubmit,
      categories,
      initialFormValues = null,
      disableTitle = false,
    },
    ref
  ) => {
    const { t } = useTranslation();

    const categoryOptions = categories.map(({ name, id }) => ({
      label: name,
      value: id,
    }));

    return (
      <FormikForm
        className="h-[600px] min-h-[600px]"
        formikProps={{
          initialValues: initialFormValues ?? POST_FORM_INITIAL_VALUES,
          enableReinitialize: true,
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
          innerRef: ref,
        }}
      >
        <div className="mt-8 flex h-full w-full flex-col rounded-xl border p-12 shadow-md">
          <div className="flex flex-col gap-6">
            <Input
              required
              className="w-full"
              disabled={disableTitle}
              label={t("labels.title")}
              name="title"
              placeholder={t("placeholders.title")}
            />
            <Select
              isMulti
              required
              label={t("labels.categories")}
              name="categories"
              options={categoryOptions}
              placeholder={t("placeholders.categories")}
            />
            <Textarea
              required
              className="w-full"
              label={t("labels.description")}
              maxLength={MAX_DESCRIPTION_LENGTH}
              name="description"
              placeholder={t("placeholders.description")}
            />
          </div>
        </div>
      </FormikForm>
    );
  }
);

Form.displayName = "From";
export default Form;
