import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";

const Status = ({ status }) => {
  const handleClick = () => {};

  return (
    <div className="flex items-center justify-between">
      <Typography style="body2">{status}</Typography>
      <Button icon={MenuHorizontal} style="text" onClick={handleClick} />
    </div>
  );
};

export default Status;
