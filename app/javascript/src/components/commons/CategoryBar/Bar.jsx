import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Bar = ({ name }) => (
  <div className="w-full rounded bg-white px-2 py-1 shadow">
    <Typography className="text-nowrap" style="body3">
      {name}
    </Typography>
  </div>
);

export default Bar;
