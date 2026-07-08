import "../stylesheets/application.scss";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "../src/common/logger";

initializeLogger();
setAuthHeaders();
