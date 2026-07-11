import React, { useState } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

import Bar from "./Bar";
import CategoryHead from "./Head";

import { useFetchCategories } from "../../../hooks/reactQueries/useCategoriesApi";
import useDebounce from "../../../hooks/useDebounce";

const Index = ({ isVisible }) => {
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword);

  const { data: { categories = [] } = {}, isLoading } =
    useFetchCategories(debouncedKeyword);

  if (isVisible && isLoading) {
    return (
      <div className="w-56 bg-gray-200 px-4 pt-10">
        <CategoryHead />
        <div className="mt-8 flex h-fit w-full flex-col items-center gap-2">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "overflow-hidden overflow-y-scroll bg-gray-200 pb-4 pt-10 transition-all duration-500",
        {
          "w-56 px-4": isVisible,
          "w-0 px-0": !isVisible,
        }
      )}
    >
      <CategoryHead {...{ keyword, setKeyword }} />
      <div className="mt-8 flex h-fit w-full flex-col items-center gap-2">
        {isNotEmpty(categories) ? (
          categories.map(({ id, name }) => <Bar key={id} {...{ name, id }} />)
        ) : (
          <Typography style="body2">No category</Typography>
        )}
      </div>
    </div>
  );
};

export default Index;
