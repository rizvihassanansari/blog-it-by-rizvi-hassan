import React, { useRef, useState } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Redirect } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import CreatePostForm from "./commons/Form";
import SubmitButton from "./commons/SubmitButton";
import { modifySubmitPayload } from "./utils";

import { useFetchCategories } from "../../hooks/reactQueries/useCategoriesApi";
import { useCreatePost } from "../../hooks/reactQueries/usePostsApi";
import { setPreviewPost } from "../../utils/storage";
import Title from "../commons/Title";
import { formatDateTime } from "../utils";

const Create = () => {
  const [savedTime, setSavedTime] = useState("");

  const formRef = useRef(null);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSuccess = data => {
    if (formRef.current.values.isPublished) {
      history.push(routes.root);
    } else {
      setSavedTime(formatDateTime(data?.updatedAt));
    }
  };
  const { mutate, isPending: isLoading } = useCreatePost(handleSuccess);

  const handleSubmit = formValues => {
    const payload = modifySubmitPayload(formValues);
    mutate({ payload, quiet: !formValues.isPublished });
  };

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleUpdate = (publish = false) => {
    formRef.current.values.isPublished = !!publish;
    formRef.current.validateForm();

    if (formRef.current.isValid) {
      formRef.current.submitForm();
    }
  };

  const handlePreview = () => {
    const previewData = formRef.current.values;
    previewData["categories"] = formRef.current.values.categories.map(item => ({
      id: item.value,
      name: item.label,
    }));
    previewData["user"] = { name: "Your name" };
    setPreviewPost(previewData);
    history.push(routes.posts.preview);
  };

  return (
    <>
      <div className="flex justify-between">
        <Title titleText={t("titles.newBlogPost")} />
        <div className="flex items-center justify-center gap-2">
          <Typography style="nano">
            {isNotEmpty(savedTime) && (
              <Trans
                components={{ bold: <b /> }}
                i18nKey="messages.draftSaved"
                values={{ time: savedTime }}
              />
            )}
          </Typography>
          <Button
            icon={Redirect}
            style="text"
            tooltipProps={{
              content: t("labels.preview"),
            }}
            onClick={handlePreview}
          />
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
