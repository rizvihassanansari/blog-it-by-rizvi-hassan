import React, { useState } from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import Status from "./Status";
import Title from "./Title";

import { formatDateTime } from "../utils";

const Table = ({
  posts,
  refetch,
  visibleColumns: isColumnVisible,
  setSelectedRowsSlug,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { t } = useTranslation();

  const columnData = [
    {
      title: t("titles.table.title"),
      dataIndex: "title",
      key: "title",
      width: 450,
      render: ({ title, slug }) => <Title {...{ title, slug }} />,
    },
    {
      title: t("titles.table.category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("titles.table.lastPublished"),
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: t("titles.table.status"),
      dataIndex: "status",
      key: "status",
      width: 150,
      render: values => <Status {...{ ...values, refetch }} />,
    },
  ];

  const visibleColumnsData = columnData.filter(
    column => isColumnVisible[column.key]
  );

  const rowData = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: { title: post.title, slug: post.slug },
    category: post.categories.map(category => category.name).join(", "),
    updatedAt: formatDateTime(post.updatedAt),
    status: { isPublished: post.isPublished, slug: post.slug },
  }));

  const handleChange = (RowKeys, selectedRows) => {
    setSelectedRowKeys(RowKeys);
    setSelectedRowsSlug(pluck("slug", selectedRows));
  };

  return (
    <NeetoTable
      columnData={visibleColumnsData}
      rowData={rowData}
      selectedRowKeys={selectedRowKeys}
      rowSelection={{
        type: "checkbox",
      }}
      onRowSelect={handleChange}
    />
  );
};

export default Table;
