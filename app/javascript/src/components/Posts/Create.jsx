import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";
import postsApi from "apis/posts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import {
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
} from "./constants";

import { Container } from "../commons";
import Title from "../commons/Title";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      await postsApi.create(values);
      history.push("/");
    } catch {
      // logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title titleText={t("titles.newBlogPost")} />
      <Form
        className="h-[600px]"
        formikProps={{
          initialValues: POST_FORM_INITIAL_VALUES,
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        <div className="mt-8 flex h-full w-full flex-col rounded-xl border p-12 shadow-md">
          <div className="flex flex-col gap-6">
            <Input
              required
              className="w-full"
              label={t("labels.title")}
              name="title"
              placeholder={t("placeholders.title")}
            />
            <Textarea
              required
              className="w-full"
              label={t("labels.description")}
              name="description"
              placeholder={t("placeholders.description")}
              rows={10}
            />
          </div>
          <div className=" mt-auto flex justify-end gap-6">
            <Button
              className="black-button--secondary"
              disabled={false}
              label={t("labels.cancel")}
              type="button"
              onClick={() => history.push("/")}
            />
            <Button
              className="black-button--primary"
              label={t("labels.submit")}
              loading={isLoading}
              type="submit"
            />
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Create;
