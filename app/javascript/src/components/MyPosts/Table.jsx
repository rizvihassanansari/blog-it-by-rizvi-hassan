import React from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";

import { formatDateTime } from "../utils";

const Table = ({ posts }) => {
  const columnData = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "id",
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
    title: post.title,
    category: post.categories.map(category => category.name).join(", "),
    updatedAt: formatDateTime(post.updatedAt),
    status: post.isBloggable ? "Published" : "Draft",
  }));

  return <NeetoTable columnData={columnData} rowData={rowData} />;
};

export default Table;
