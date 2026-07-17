import React from "react";

import { Pagination } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import PostItem from "./Item";

import { useFetchPosts } from "../../../hooks/reactQueries/usePostsApi";
import useQueryParams from "../../../hooks/useQueryParams";
import { buildUrl } from "../../../utils/urls";
import { PageLoader } from "../../commons";
import Title from "../../commons/Title";

const Index = () => {
  const { page = DEFAULT_PAGE_INDEX, categories = [] } = useQueryParams();

  const history = useHistory();
  const { t } = useTranslation();

  const { data: { posts = [], totalResults = 0 } = {}, isLoading } =
    useFetchPosts({
      page,
      categories,
    });

  const handleClick = () => {
    history.push(routes.posts.create);
  };

  const handlePageNavigation = nextPage => {
    const url = buildUrl(routes.root, { page: nextPage, categories });
    history.push(url);
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
          <PostItem key={post.id} {...{ ...post }} />
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 flex w-full justify-end bg-white py-2 pr-2 ">
        <Pagination
          className="neetix-pagination"
          count={Number(totalResults)}
          navigate={handlePageNavigation}
          pageNo={Number(page)}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default Index;
