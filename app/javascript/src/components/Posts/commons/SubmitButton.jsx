import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { ActionDropdown, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { withTranslation } from "react-i18next";

const SubmitButton = ({ handleUpdate, t, handleDelete = null }) => {
  const [isPublish, setIsPublish] = useState(true);

  return (
    <ActionDropdown
      className=""
      label={t(isPublish ? "labels.publish" : "labels.saveDraft")}
      buttonProps={{
        className: "neetix-button--primary",
      }}
      dropdownProps={{
        buttonProps: {
          className: "neetix-button--primary",
        },
      }}
      onClick={() => handleUpdate(isPublish)}
    >
      <ActionDropdown.Menu>
        <ActionDropdown.MenuItem onClick={() => setIsPublish(true)}>
          <Typography
            className="flex cursor-pointer items-center justify-start px-2"
            style="body2"
            weight={!isPublish ? "light" : "medium"}
          >
            <Check
              className={classNames({
                "opacity-0": !isPublish,
                "opacity-100": isPublish,
              })}
            />
            {t("labels.publish")}
          </Typography>
        </ActionDropdown.MenuItem>
        <ActionDropdown.MenuItem onClick={() => setIsPublish(false)}>
          <Typography
            className="flex cursor-pointer items-center justify-start px-2"
            style="body2"
            weight={!isPublish ? "medium" : "light"}
          >
            <Check
              className={classNames({
                "opacity-0": isPublish,
                "opacity-100": !isPublish,
              })}
            />
            {t("labels.saveDraft")}
          </Typography>
        </ActionDropdown.MenuItem>
        {handleDelete && (
          <>
            <ActionDropdown.Divider />
            <ActionDropdown.MenuItem onClick={handleDelete}>
              <Typography
                className="flex cursor-pointer items-center justify-start px-2 pl-8 text-red-500"
                style="body2"
                weight="bold"
              >
                {t("labels.delete")}
              </Typography>
            </ActionDropdown.MenuItem>
          </>
        )}
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default withTranslation()(SubmitButton);
