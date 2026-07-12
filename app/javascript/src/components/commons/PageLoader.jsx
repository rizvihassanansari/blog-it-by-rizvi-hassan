import React from "react";

import classnames from "classnames";
import { withTranslation } from "react-i18next";

const PageLoader = ({ t }) => (
  <div
    className={classnames(
      "flex h-screen w-full flex-row items-center justify-center"
    )}
  >
    <h1 className="text-lg leading-5">{t("messages.loading")}</h1>
  </div>
);

export default withTranslation()(PageLoader);
