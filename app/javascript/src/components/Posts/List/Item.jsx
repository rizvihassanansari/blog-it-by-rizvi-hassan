import React from "react";

import { DownArrowCircle, UpArrowCircle } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";
import routes from "routes";

import { formatDate } from "../../utils";
import CategoryTags from "../commons/Tags";

const Item = ({
  title,
  updatedAt,
  slug,
  user: { name = "" } = {},
  categories,
}) => (
  <li className="flex h-full items-center justify-between border-b border-gray-300 pb-4 pt-6">
    <div className="w-full">
      <Link to={`${routes.posts.show.replace(":slug", slug)}`}>
        <Typography
          className="mb-2 hover:text-blue-700"
          style="h2"
          weight="bold"
        >
          {title}
        </Typography>
      </Link>
      <CategoryTags {...{ categories }} />
      <Typography style="body3" weight="bold">
        {name}
      </Typography>
      <Typography style="nano">{formatDate(updatedAt)}</Typography>
    </div>
    <div className="flex h-full w-10 flex-col items-center gap-1 ">
      <UpArrowCircle className="cursor-pointer rounded-full text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-white" />
      <Typography style="body2" weight="bold">
        50
      </Typography>
      <DownArrowCircle className="cursor-pointer rounded-full text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white" />
    </div>
  </li>
);

export default Item;
