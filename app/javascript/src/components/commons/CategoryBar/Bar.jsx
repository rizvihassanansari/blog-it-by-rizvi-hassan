import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { DEFAULT_PAGE_INDEX } from "components/Posts/List/constants";
import useQueryParams from "hooks/useQueryParams";
import { symmetricDifference } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/urls";

const Bar = ({ id, name }) => {
  const { categories = [] } = useQueryParams();
  const history = useHistory();

  const [isSelected, setIsSelected] = useState(
    categories.includes(id.toString())
  );

  const toggleItem = (item, list) => symmetricDifference([item], list);

  const handleClick = () => {
    setIsSelected(previous => !previous);
    const newCategories = toggleItem(id.toString(), categories);
    history.replace(
      buildUrl(routes.root, {
        page: DEFAULT_PAGE_INDEX,
        categories: newCategories,
      })
    );
  };

  return (
    <div
      className={classNames("w-full cursor-pointer rounded px-2 py-1 shadow", {
        "bg-white": isSelected,
        "bg-transparent": !isSelected,
      })}
      onClick={handleClick}
    >
      <Typography className="text-nowrap" style="body3">
        {name}
      </Typography>
    </div>
  );
};

export default Bar;
