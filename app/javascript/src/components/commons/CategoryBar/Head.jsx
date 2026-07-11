import React from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

const Head = () => {
  const { t } = useTranslation();

  return (
    <header className="flex w-full items-center">
      <Typography weight="bold">{t("titles.categories")}</Typography>
      <div className="ml-auto flex">
        <Button icon={Search} size="small" style="text" />
        <Button icon={Plus} size="small" style="text" />
      </div>
    </header>
  );
};

export default Head;
