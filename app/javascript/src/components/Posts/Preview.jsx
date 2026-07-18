import React from "react";

import { Typography, Tag } from "@bigbinary/neetoui";
import UserAvatar from "components/commons/Avatar";
import Title from "components/commons/Title";
import Tags from "components/Posts/commons/Tags";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useEditPostStore from "stores/usePreviewPostStore";

const Preview = ({ t }) => {
  const previewPostData = useEditPostStore(store => store.previewPostData);
  const history = useHistory();

  if (!previewPostData) {
    history.goBack();
  }

  const modifyCategories = categories =>
    categories.map(({ label, value }) => ({ id: value, name: label }));

  return (
    <>
      <Tags categories={modifyCategories(previewPostData?.categories)} />
      <div className="flex items-start justify-between pr-4">
        <div className="flex items-center gap-3">
          <Title titleText={previewPostData?.title} />
          <Tag label={t("labels.previewTag")} size="small" style="danger" />
        </div>
      </div>
      <UserAvatar
        showName
        className="my-3"
        date={previewPostData?.updatedAt}
        size="large"
        user={previewPostData?.user}
      />
      <Typography className="my-8 whitespace-pre-wrap break-words">
        {previewPostData?.description}
      </Typography>
    </>
  );
};

export default withTranslation()(Preview);
