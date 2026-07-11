import React from "react";

import { Pagination } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import PostItem from "./Item";

import { useFetchPosts } from "../../../hooks/reactQueries/usePostsApi";
import { PageLoader } from "../../commons";
import Title from "../../commons/Title";

const Index = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { data: { posts = [], totalResults = 0 } = {}, isLoading } =
    useFetchPosts({
      page: DEFAULT_PAGE_INDEX,
    });

  const handleClick = () => {
    history.push(routes.posts.create);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Title
        buttonProps={{ label: t("labels.newBlogPost"), onClick: handleClick }}
        titleText={t("titles.blogPosts")}
      />
      <ul className="mt-4">
        {posts?.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
      <div className="sticky bottom-0 left-0 flex w-full justify-end bg-white py-2 pr-2 ">
        <Pagination
          count={Number(totalResults)}
          navigate={() => {}}
          pageNo={DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default Index;
