import React from "react";

import { Link } from "react-router-dom";

import routes from "../../routes";

const Title = ({ title, slug }) => (
  <Link
    className="text-green-700"
    to={routes.posts.show.replace(":slug", slug)}
  >
    {title}
  </Link>
);

export default Title;
