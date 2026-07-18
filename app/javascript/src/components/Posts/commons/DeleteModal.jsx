import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { Trans } from "react-i18next";

const DeleteModal = ({
  t,
  isDeleteModalOpen,
  title,
  setIsDeleteModalOpen,
  handleDelete,
}) => (
  <Alert
    isOpen={isDeleteModalOpen}
    title={t("titles.deletePost")}
    message={
      <Trans
        components={{ bold: <b /> }}
        i18nKey="messages.deletePost"
        values={{ post: title }}
      />
    }
    onClose={() => setIsDeleteModalOpen(false)}
    onSubmit={() => {
      handleDelete();
      setIsDeleteModalOpen(false);
    }}
  />
);

export default DeleteModal;
