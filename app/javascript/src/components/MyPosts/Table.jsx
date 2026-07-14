import React from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";

import Status from "./Status";
import Title from "./Title";

import { formatDateTime } from "../utils";

const Table = ({ posts }) => {
  const columnData = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "id",
      render: ({ title, slug }) => <Title {...{ title, slug }} />,
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
      width: 150,
      render: status => <Status {...{ status }} />,
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
