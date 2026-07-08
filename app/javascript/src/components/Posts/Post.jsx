import React from "react";

import { Typography } from "@bigbinary/neetoui";

import { formatDate } from "../utils";

const Post = ({ title, description, created_at }) => (
  <li className="border-b border-gray-300 pb-2 pt-6">
    <Typography className="mb-2" style="h3" weight="bold">
      {title}
    </Typography>
    <Typography className="mb-2 line-clamp-2 leading-tight" style="body2">
      {description}
    </Typography>
    <Typography style="nano">{formatDate(created_at)}</Typography>
  </li>
);

export default Post;
