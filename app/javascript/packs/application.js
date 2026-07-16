import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import i18n from "common/i18n";
import { setAuthHeaders, registerIntercepts } from "apis/axios";

import App from "../src/App";
import { initializeLogger } from "common/logger";

initializeLogger();
setAuthHeaders();
registerIntercepts();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
