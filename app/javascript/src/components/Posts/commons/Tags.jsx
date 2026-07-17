import React from "react";

import { Tag } from "@bigbinary/neetoui";

const Tags = ({ categories }) => (
  <div className="my-2 flex gap-1">
    {categories.map(({ id, name }) => (
      <Tag key={id} label={name} style="success" type="solid" />
    ))}
  </div>
);

export default Tags;
