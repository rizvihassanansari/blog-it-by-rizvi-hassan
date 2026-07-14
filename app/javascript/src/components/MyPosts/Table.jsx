import React from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";

import Status from "./Status";
import Title from "./Title";

import { formatDateTime } from "../utils";

const Table = ({ posts, refetch }) => {
  const columnData = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "id",
      width: 450,
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
      render: values => <Status {...{ ...values, refetch }} />,
    },
  ];

  const rowData = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: { title: post.title, slug: post.slug },
    category: post.categories.map(category => category.name).join(", "),
    updatedAt: formatDateTime(post.updatedAt),
    status: { isBloggable: post.isBloggable, slug: post.slug },
  }));

  return <NeetoTable columnData={columnData} rowData={rowData} />;
};

export default Table;
