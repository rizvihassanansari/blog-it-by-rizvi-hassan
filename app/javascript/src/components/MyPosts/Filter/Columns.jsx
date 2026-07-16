import React from "react";

import { ActionDropdown, Checkbox } from "@bigbinary/neetoui";

const Columns = ({ visibleColumns, handleToggleVisibleColumns }) => (
  <ActionDropdown buttonStyle="secondary" className="ml-auto" label="Columns">
    <ActionDropdown.Menu>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked
          disabled
          className="neetix-checkbox px-4 py-2"
          label="Title"
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.category}
          className="neetix-checkbox px-4 py-2"
          id="category"
          label="Categories"
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.updatedAt}
          className="neetix-checkbox px-4 py-2"
          id="updatedAt"
          label="Last Published at"
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
      <ActionDropdown.MenuItem>
        <Checkbox
          checked={visibleColumns.status}
          className="neetix-checkbox px-4 py-2"
          id="status"
          label="Status"
          onChange={handleToggleVisibleColumns}
        />
      </ActionDropdown.MenuItem>
    </ActionDropdown.Menu>
  </ActionDropdown>
);

export default Columns;
