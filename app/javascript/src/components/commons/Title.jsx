import React from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Button, Typography } from "@bigbinary/neetoui";

const Title = ({ titleText, buttonProps = {} }) => (
  <Typography className="flex" style="h1" weight="bold">
    {titleText}
    {isNotEmpty(buttonProps) && (
      <Button
        className="black-button--primary ml-auto"
        label={buttonProps.label}
        type="button"
        onClick={buttonProps.onClick}
      />
    )}
  </Typography>
);

export default Title;
