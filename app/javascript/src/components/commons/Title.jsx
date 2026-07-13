import React from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

const Title = ({ titleText, buttonProps = {}, className }) => (
  <Typography
    className={classNames("flex", [className])}
    style="h1"
    weight="bold"
  >
    {titleText}
    {isNotEmpty(buttonProps) && (
      <Button
        className="black-button--primary ml-auto"
        label={buttonProps.label}
        size="small"
        type="button"
        onClick={buttonProps.onClick}
      />
    )}
  </Typography>
);

export default Title;
