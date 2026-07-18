import React, { useEffect, useRef, useState } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Redirect } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import Title from "components/commons/Title";
import EditPostForm from "components/Posts/commons/Form";
import SubmitButton from "components/Posts/commons/SubmitButton";
import { modifySubmitPayload } from "components/Posts/utils";
import { formatDateTime } from "components/utils/dateTime";
import { useFetchCategories } from "hooks/reactQueries/useCategoriesApi";
import {
  useDeletePost,
  useShowPost,
  useUpdatePost,
} from "hooks/reactQueries/usePostsApi";
import { Trans, useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import usePreviewPostStore from "stores/usePreviewPostStore";

const Edit = () => {
  const { previewPostData, setPreviewPostData } = usePreviewPostStore();

  const [initialFormValues, setInitialFormValues] = useState(previewPostData);
  const [savedTime, setSavedTime] = useState("");

  const formRef = useRef(null);

  const { slug } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const { data: { post } = {} } = useShowPost(slug);

  const handleSuccess = data => {
    if (formRef.current.values.isPublished) {
      history.push(routes.root);
    } else {
      setSavedTime(formatDateTime(data?.updatedAt));
    }
    setPreviewPostData(null);
  };

  const { mutate, isPending: isLoading } = useUpdatePost(handleSuccess);
  const { mutate: deletePost } = useDeletePost(() => history.push(routes.root));

  const handleSubmit = formValues => {
    const payload = modifySubmitPayload(formValues);
    mutate({ slug, payload, quiet: !formValues.isPublished });
  };

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleUpdate = (publish = false) => {
    formRef.current.values.isPublished = !!publish;
    formRef.current.validateForm();

    if (formRef.current.isValid) {
      formRef.current.submitForm();
    }
  };

  const handleDelete = () => {
    deletePost({ slug });
  };

  const handlePreview = () => {
    const previewData = formRef.current.values;
    previewData["user"] = post.user;
    previewData["id"] = post.id;
    setPreviewPostData(previewData);
    history.push(routes.posts.preview);
  };

  useEffect(() => {
    if (post && previewPostData?.id !== post.id) {
      const postValues = {
        title: post.title,
        description: post.description,
        isPublished: post.isPublished,
      };

      const categoryOptions = post.categories.map(category => ({
        label: category.name,
        value: category.id,
      }));

      setInitialFormValues({ ...postValues, categories: categoryOptions });
    }
  }, [post]);

  return (
    <>
      <div className="flex justify-between">
        <Title titleText={t("titles.editBlogPost")} />
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
            onClick={() => {
              history.goBack();
              setPreviewPostData(null);
            }}
          />
          <SubmitButton
            {...{
              handleUpdate,
              handleDelete,
              title: post?.title,
            }}
          />
        </div>
      </div>
      <EditPostForm
        ref={formRef}
        {...{
          isLoading,
          handleSubmit,
          categories,
          initialFormValues,
        }}
        disableTitle
      />
    </>
  );
};

export default Edit;
