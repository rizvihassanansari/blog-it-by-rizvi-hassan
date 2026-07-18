import React from "react";

import { Typography, Tag } from "@bigbinary/neetoui";
import UserAvatar from "components/commons/Avatar";
import Title from "components/commons/Title";
import Tags from "components/Posts/commons/Tags";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getPreviewPost } from "utils/storage";

const Preview = ({ t }) => {
  const previewPost = getPreviewPost();
  const history = useHistory();

  if (!previewPost) {
    history.goBack();
  }

  return (
    <>
      <Tags categories={previewPost?.categories} />
      <div className="flex items-start justify-between pr-4">
        <div className="flex items-center gap-3">
          <Title titleText={previewPost?.title} />
          <Tag label={t("labels.previewTag")} size="small" style="danger" />
        </div>
      </div>
      <UserAvatar
        showName
        className="my-3"
        date={previewPost?.updatedAt}
        size="large"
        user={previewPost?.user}
      />
      <Typography className="my-8 whitespace-pre-wrap break-words">
        {previewPost?.description}
      </Typography>
    </>
  );
};

export default withTranslation()(Preview);
