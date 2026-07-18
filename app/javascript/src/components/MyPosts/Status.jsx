import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, Dropdown, Typography } from "@bigbinary/neetoui";
import { useDeletePost, useUpdatePost } from "hooks/reactQueries/usePostsApi";
import { useTranslation } from "react-i18next";

const Status = ({ isPublished, slug, refetch: handleSuccess }) => {
  const { t } = useTranslation();

  const { mutate: updatePost } = useUpdatePost(handleSuccess);
  const { mutate: deletePost } = useDeletePost(handleSuccess);

  const handleUpdateStatus = () => {
    updatePost({ slug, payload: { isPublished: !isPublished }, quiet: true });
  };

  const handleDeletePost = () => {
    deletePost({ slug, quiet: true });
  };

  return (
    <div className="flex items-center justify-between overflow-visible">
      <Typography style="body2">
        {t(isPublished ? "labels.published" : "labels.draft")}
      </Typography>
      <div>
        <Dropdown
          customTarget={<Button icon={MenuHorizontal} style="text" />}
          strategy="fixed"
        >
          <Dropdown.Menu>
            <Dropdown.MenuItem onClick={handleUpdateStatus}>
              <Typography className="px-2 py-1" style="body2">
                {t(isPublished ? "labels.unpublish" : "labels.publish")}
              </Typography>
            </Dropdown.MenuItem>
            <Dropdown.Divider />
            <Dropdown.MenuItem onClick={handleDeletePost}>
              <Typography className="px-2 py-1 text-red-500" style="body2">
                {t("labels.delete")}
              </Typography>
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Status;
