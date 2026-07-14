import React from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";
import { formatDateTime } from "../utils";

const Table = ({ posts }) => {
  const columnData = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "id",
      render: ({ title, slug }) => (
        <Link to={routes.posts.show.replace(":slug", slug)}>{title}</Link>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "LAST PUBLISHED AT",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
  ];

  const rowData = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: { title: post.title, slug: post.slug },
    category: post.categories.map(category => category.name).join(", "),
    updatedAt: formatDateTime(post.updatedAt),
    status: post.isBloggable ? "Published" : "Draft",
  }));

  return <NeetoTable columnData={columnData} rowData={rowData} />;
};

export default Table;
