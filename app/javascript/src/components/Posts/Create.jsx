import React, { useRef } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import CreateUserForm from "./Form";
import { modifySubmitPayload } from "./utils";

import { useFetchCategories } from "../../hooks/reactQueries/useCategoriesApi";
import { useCreatePost } from "../../hooks/reactQueries/usePostsApi";
import Title from "../commons/Title";

const Create = () => {
  const formRef = useRef(null);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSuccess = () => {
    history.push(routes.root);
  };

  const { mutate, isPending: isLoading } = useCreatePost(handleSuccess);

  const handleSubmit = formValues => {
    const payload = modifySubmitPayload(formValues);
    mutate(payload);
  };

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handlePublish = () => {
    formRef.current.values.isBloggable = "true";
    formRef.current.validateForm();

    if (formRef.current.isValid) {
      formRef.current.submitForm();
    }
  };

  const handleSaveDraft = () => {
    formRef.current.values.isBloggable = "false";
    formRef.current.validateForm();

    if (formRef.current.isValid) {
      formRef.current.submitForm();
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Title titleText={t("titles.newBlogPost")} />
        <div className="flex items-center justify-center gap-2">
          <Button
            label={t("labels.cancel")}
            style="secondary"
            onClick={() => history.replace(routes.root)}
          />
          <ActionDropdown
            className=""
            label={t("labels.publish")}
            buttonProps={{
              className: "neetix-button--primary",
            }}
            dropdownProps={{
              buttonProps: {
                className: "neetix-button--primary",
              },
            }}
            onClick={handlePublish}
          >
            <ActionDropdown.Menu>
              <ActionDropdown.MenuItem onClick={handlePublish}>
                {t("labels.publish")}
              </ActionDropdown.MenuItem>
              <ActionDropdown.MenuItem onClick={handleSaveDraft}>
                {t("labels.saveDraft")}
              </ActionDropdown.MenuItem>
            </ActionDropdown.Menu>
          </ActionDropdown>
        </div>
      </div>
      <CreateUserForm
        ref={formRef}
        {...{
          isLoading,
          handleSubmit,
          categories,
        }}
      />
    </>
  );
};

export default Create;
