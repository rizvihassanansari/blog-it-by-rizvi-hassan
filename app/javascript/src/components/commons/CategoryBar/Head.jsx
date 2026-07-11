import React, { useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Typography, Input } from "@bigbinary/neetoui";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

const Head = ({ keyword, setKeyword }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <header className="flex w-full items-center">
        <Typography weight="bold">{t("titles.categories")}</Typography>
        <div className="ml-auto flex">
          <Button
            icon={Search}
            size="small"
            style="text"
            onClick={() => setIsSearchVisible(previous => !previous)}
          />
          <Button icon={Plus} size="small" style="text" />
        </div>
      </header>
      <div
        className={classnames("overflow-hidden transition-all duration-500", {
          "h-10 pt-2": isSearchVisible,
          "h-0 pt-0": !isSearchVisible,
        })}
      >
        <Input
          placeholder="Search category"
          size="small"
          type="text"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
        />
      </div>
    </>
  );
};

export default Head;
