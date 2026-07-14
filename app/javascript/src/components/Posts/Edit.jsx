import React, { useEffect, useRef, useState } from "react";

import { ActionDropdown, Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import EditPostForm from "./Form";
import { modifySubmitPayload } from "./utils";

import { useFetchCategories } from "../../hooks/reactQueries/useCategoriesApi";
import {
  useShowPost,
  useUpdatePost,
} from "../../hooks/reactQueries/usePostsApi";
import routes from "../../routes";
import Title from "../commons/Title";

const Edit = () => {
  const [initialFormValues, setInitialFormValues] = useState(null);

  const formRef = useRef(null);

  const { slug } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const { data: { post } = {} } = useShowPost(slug);

  const { mutate, isPending: isLoading } = useUpdatePost();

  const handleSubmit = formValues => {
    const payload = modifySubmitPayload(formValues);
    mutate({ slug, payload });
  };

  const { data: { categories = [] } = {} } = useFetchCategories();

  const handleUpdate = (publish = false) => {
    formRef.current.values.isBloggable = publish ? "true" : "false";
    formRef.current.validateForm();

    if (formRef.current.isValid) {
      formRef.current.submitForm();
    }
  };

  useEffect(() => {
    if (post) {
      const postValues = {
        title: post.title,
        description: post.description,
        isBloggable: post.isBloggable,
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
            onClick={() => handleUpdate(true)}
          >
            <ActionDropdown.Menu>
              <ActionDropdown.MenuItem onClick={() => handleUpdate(true)}>
                {t("labels.publish")}
              </ActionDropdown.MenuItem>
              <ActionDropdown.MenuItem onClick={() => handleUpdate(false)}>
                {t("labels.saveDraft")}
              </ActionDropdown.MenuItem>
            </ActionDropdown.Menu>
          </ActionDropdown>
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
