import React, { useState } from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";
import postsApi from "apis/posts";
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

  const handleSubmit = async values => {
    setIsLoading(true);
    // console.log("submitting values: ", values);
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
      <Title titleText="New blog post" />
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
              label="Title"
              name="title"
              placeholder="Enter title"
            />
            <Textarea
              required
              className="w-full"
              label="Description"
              name="description"
              placeholder="Enter description"
            />
          </div>
          <div className=" mt-auto flex justify-end gap-6">
            <Button
              className="black-button--secondary"
              disabled={false}
              label="Cancel"
              style="tertiary"
              type="button"
              onClick={() => history.push("/")}
            />
            <Button
              className="black-button--primary"
              label="Submit"
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
