import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button, Tag, Typography } from "@bigbinary/neetoui";
import { PageLoader } from "components/commons";
import UserAvatar from "components/commons/Avatar";
import Title from "components/commons/Title";
import DownloadAsPdf from "components/Posts/commons/DownloadAsPdf";
import Tags from "components/Posts/commons/Tags";
import { useShowPost } from "hooks/reactQueries/usePostsApi";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { getFromLocalStorage } from "utils/storage";

const Show = () => {
  const { slug } = useParams();
  const currentUserId = parseInt(getFromLocalStorage("authUserId"));

  const { t } = useTranslation();
  const history = useHistory();

  const { data: { post = {} } = {}, isLoading } = useShowPost(slug);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Tags categories={post?.categories} />
      <div className="flex items-center justify-between pr-4">
        <div className="flex w-full items-center gap-3">
          <Title className="w-ful" titleText={post?.title} />
          {!post.isPublished && (
            <Tag label={t("labels.draft")} size="small" style="danger" />
          )}
        </div>
        <DownloadAsPdf {...{ slug }} />
        {post?.user?.id === currentUserId && (
          <Button
            className="aspect-square cursor-pointer"
            icon={Edit}
            style="text"
            tooltipProps={{
              content: t("labels.edit"),
            }}
            onClick={() =>
              history.replace(routes.posts.edit.replace(":slug", slug))
            }
          />
        )}
      </div>
      <UserAvatar
        showName
        className="my-3"
        date={post?.updatedAt}
        size="large"
        user={post?.user}
      />
      <Typography className="whitespace-pre-wrap break-words py-8">
        {post?.description}
      </Typography>
    </>
  );
};

export default Show;
