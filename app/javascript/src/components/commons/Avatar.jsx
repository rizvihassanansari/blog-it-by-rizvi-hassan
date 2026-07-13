import React from "react";

import { Avatar as UserIcon, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

import { formatDate } from "../utils";

const Avatar = ({
  user,
  date = null,
  className,
  showName = false,
  ...restParams
}) => (
  <div className={classNames("flex items-center", [className])}>
    <UserIcon {...{ user, ...restParams }} />
    {showName && (
      <div className="ml-4">
        {showName && (
          <>
            <Typography style="body2" weight="bold">
              {user.name}
            </Typography>
            <Typography style="body3">{user.email}</Typography>
          </>
        )}
        {date && <Typography style="body3">{formatDate(date)}</Typography>}
      </div>
    )}
  </div>
);

export default Avatar;
