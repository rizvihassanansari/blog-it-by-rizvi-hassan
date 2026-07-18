import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

const DeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleBulkDelete,
  postsCount,
}) => {
  const { t } = useTranslation();

  return (
    <Alert
      isOpen={isDeleteModalOpen}
      title={t("titles.deleteMultiplePosts")}
      message={
        <Trans
          components={{ bold: <b /> }}
          i18nKey="messages.deleteMultiplePosts"
          values={{ count: postsCount }}
        />
      }
      onClose={() => setIsDeleteModalOpen(false)}
      onSubmit={() => {
        handleBulkDelete();
        setIsDeleteModalOpen(false);
      }}
    />
  );
};

export default DeleteModal;
