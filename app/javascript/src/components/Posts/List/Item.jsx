import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";
import routes from "routes";

import { formatDate } from "../../utils";
import CategoryTags from "../commons/Tags";

const Item = ({
  title,
  created_at,
  slug,
  user: { name = "" } = {},
  categories,
}) => (
  <li className="border-b border-gray-300 pb-2 pt-6">
    <Link to={`${routes.posts.show.replace(":slug", slug)}`}>
      <Typography className="mb-2 hover:text-blue-700" style="h2" weight="bold">
        {title}
      </Typography>
    </Link>
    <CategoryTags {...{ categories }} />
    <Typography style="body3" weight="bold">
      {name}
    </Typography>
    <Typography style="nano">{formatDate(created_at)}</Typography>
  </li>
);

export default Item;
