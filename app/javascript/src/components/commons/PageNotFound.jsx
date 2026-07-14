import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { NoData } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";

const PageNotFound = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <NoData
        description={t("messages.pageNotFound")}
        title={t("titles.notFound")}
        primaryButtonProps={{
          className: "black-button--primary",
          label: t("labels.home"),
          icon: LeftArrow,
          iconPosition: "left",
          onClick: () => history.replace(routes.root),
        }}
      />
    </div>
  );
};

export default PageNotFound;
