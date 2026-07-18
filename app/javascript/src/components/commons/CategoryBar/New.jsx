import React from "react";

import { Modal, Typography, Button as NeetoUiButton } from "@bigbinary/neetoui";
import { Form as FormikForm, Input, Button } from "@bigbinary/neetoui/formik";
import {
  CATEGORY_FORM_VALIDATION_SCHEMA,
  INITIAL_FORM_PROPS,
} from "components/commons/CategoryBar/constants";
import { useCreateCategory } from "hooks/reactQueries/useCategoriesApi";
import { useTranslation } from "react-i18next";

const New = ({ isOpen, setIsOpen, refetchCategories }) => {
  const { t } = useTranslation();

  const handleSuccess = () => {
    setIsOpen(false);
    refetchCategories();
  };

  const { mutate } = useCreateCategory(handleSuccess);

  const handleSubmit = values => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <Typography style="h3" weight="bold">
          {t("titles.newCategory")}
        </Typography>
      </Modal.Header>
      <Modal.Body className="mt-4 space-y-2">
        <FormikForm
          formikProps={{
            initialValues: INITIAL_FORM_PROPS,
            validationSchema: CATEGORY_FORM_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <Input
            label={t("labels.categoryName")}
            name="name"
            placeholder={t("placeholders.categoryName")}
          />
          <div className="mt-6 flex gap-2">
            <Button
              className="black-button--primary"
              label={t("labels.add")}
              size="small"
              type="submit"
            />
            <NeetoUiButton
              className="black-button--secondary"
              disabled={false}
              label={t("labels.cancel")}
              size="small"
              type="button"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </FormikForm>
      </Modal.Body>
    </Modal>
  );
};

export default New;
