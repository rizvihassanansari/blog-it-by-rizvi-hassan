import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Tags from "./commons/Tags";

import { useShowPost } from "../../hooks/reactQueries/usePostsApi";
import routes from "../../routes";
import { getFromLocalStorage } from "../../utils/storage";
import { PageLoader } from "../commons";
import UserAvatar from "../commons/Avatar";
import Title from "../commons/Title";

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
      <div className="flex items-start justify-between pr-4">
        <Title titleText={post?.title} />
        {post?.userId === currentUserId && (
          <Button
            classname="aspect-square cursor-pointer"
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
      <Typography className="my-8 whitespace-pre-wrap break-words">
        {post?.description}
      </Typography>
    </>
  );
};

export default Show;
