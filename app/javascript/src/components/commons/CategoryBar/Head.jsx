import React, { useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Typography, Input } from "@bigbinary/neetoui";
import classnames from "classnames";
import NewCategory from "components/commons/CategoryBar/New";
import { useTranslation } from "react-i18next";

const Head = ({ keyword, setKeyword, ...restParams }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Button
            icon={Plus}
            size="small"
            style="text"
            tooltipProps={{ content: t("messages.tooltip.addCategory") }}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </header>
      <div
        className={classnames("overflow-hidden transition-all duration-500", {
          "h-10 pt-2": isSearchVisible,
          "h-0 pt-0": !isSearchVisible,
        })}
      >
        <Input
          placeholder={t("placeholders.searchCategory")}
          size="small"
          type="text"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
        />
      </div>
      <NewCategory
        {...{ isOpen: isModalOpen, setIsOpen: setIsModalOpen, ...restParams }}
      />
    </>
  );
};

export default Head;
