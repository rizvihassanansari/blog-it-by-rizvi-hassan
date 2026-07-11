import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import CreateUserForm from "./Form";

import categoriesApi from "../../apis/categories";
import { Container } from "../commons";
import Title from "../commons/Title";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async values => {
    setIsLoading(true);
    // const valuesWithDefaultUser = { ...values, user_id: 1 }; //setting default user_id value to 1 for now
    // console.log("Values to submit:", valuesWithDefaultUser);
    try {
      await postsApi.create(values);
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
