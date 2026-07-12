import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import CreateUserForm from "./Form";
import { modifySubmitPayload } from "./utils";

import { useFetchCategories } from "../../hooks/reactQueries/useCategoriesApi";
import { useCreatePost } from "../../hooks/reactQueries/usePostsApi";
import Title from "../commons/Title";

const Create = () => {
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

  return (
    <>
      <Title titleText={t("titles.newBlogPost")} />
      <CreateUserForm {...{ isLoading, handleSubmit, categories }} />
    </>
  );
};

export default Create;
