import React from "react";

import { Tag } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";

const CategoryTags = ({ items, handleDeleteTag, isHidden }) => {
  if (isHidden || isEmpty(items)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 pl-2">
      {items.map(({ label, value }) => (
        <Tag
          key={value}
          label={label}
          style="secondary"
          onClose={() => handleDeleteTag({ label, value })}
        />
      ))}
    </div>
  );
};

export default CategoryTags;
