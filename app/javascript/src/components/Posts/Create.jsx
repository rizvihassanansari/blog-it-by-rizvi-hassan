import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";

import { Container } from "../commons";
import Title from "../commons/Title";

const Create = () => {
  const initialValues = { title: "", description: "" };

  return (
    <Container>
      <Title titleText="New blog post" />
      <Form
        className="h-[600px]"
        formikProps={{
          initialValues,
        }}
      >
        {props => (
          <div className="mt-8 flex h-full w-full flex-col rounded-xl border p-12 shadow-md">
            <div className="flex flex-col gap-6">
              <Input
                {...props}
                required
                className="w-full"
                label="Title"
                name="title"
                placeholder="Enter title"
              />
              <Textarea
                {...props}
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
              />
              <Button
                className="black-button--primary"
                label="Submit"
                type="button"
              />
            </div>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Create;
