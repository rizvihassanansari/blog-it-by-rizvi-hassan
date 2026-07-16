import React from "react";

import { ActionDropdown, Checkbox } from "@bigbinary/neetoui";
import { withTranslation } from "react-i18next";

const Columns = ({ visibleColumns, handleToggleVisibleColumns, t }) => (
  <ActionDropdown
    buttonStyle="secondary"
    className="ml-auto"
    label={t("labels.columns")}
  >
    <ActionDropdown.Menu>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked
          disabled
          className="neetix-checkbox px-4 py-2"
          label={t("labels.title")}
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.category}
          className="neetix-checkbox px-4 py-2"
          id="category"
          label={t("labels.categories")}
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.updatedAt}
          className="neetix-checkbox px-4 py-2"
          id="updatedAt"
          label={t("labels.lastPublished")}
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.status}
          className="neetix-checkbox px-4 py-2"
          id="status"
          label={t("labels.status")}
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
    </ActionDropdown.Menu>
  </ActionDropdown>
);

export default withTranslation()(Columns);
