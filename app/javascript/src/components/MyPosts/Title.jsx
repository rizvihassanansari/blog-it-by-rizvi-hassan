import React from "react";

import { Link } from "react-router-dom";

import routes from "../../routes";

const Title = ({ title, slug }) => (
  <Link
    className="block w-[450px] truncate text-green-700"
    to={routes.posts.edit.replace(":slug", slug)}
  >
    {title}
  </Link>
);

export default Title;
