import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import CreateUserForm from "./Form";
import { modifySubmitPayload } from "./utils";

import categoriesApi from "../../apis/categories";
import { Container } from "../commons";
import Title from "../commons/Title";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async formValues => {
    setIsLoading(true);
    const modifiedPayload = modifySubmitPayload(formValues);
    // console.log(modifiedPayload);
    try {
      await postsApi.create(modifiedPayload);
      history.push(routes.root);
    } catch {
      history.push(routes.root);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container>
      <Title titleText={t("titles.newBlogPost")} />
      <CreateUserForm {...{ isLoading, handleSubmit, categories }} />
    </Container>
  );
};

export default Create;
