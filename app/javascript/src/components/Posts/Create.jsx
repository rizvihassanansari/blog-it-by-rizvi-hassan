import React, { useRef } from "react";

import { Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import SubmitButton from "./commons/SubmitButton";
import CreatePostForm from "./Form";
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

  const handleUpdate = (publish = false) => {
    formRef.current.values.isBloggable = publish ? "true" : "false";
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
          <SubmitButton {...{ handleUpdate }} />
        </div>
      </div>
      <CreatePostForm
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
