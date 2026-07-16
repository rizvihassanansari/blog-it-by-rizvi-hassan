import React from "react";

import {
  Button,
  Input,
  Pane as NeetoPane,
  Select,
  Typography,
} from "@bigbinary/neetoui";

const Pane = ({ isPaneOpen, setIsPaneOpen }) => {
  const categoryOptions = [
    { label: "Tech", value: "tech" },
    { label: "Ruby", value: "ruby" },
    { label: "React", value: "react" },
  ];

  const statusOptions = [
    { label: "Both", value: "both" },
    { label: "Draft", value: "draft" },
    { label: "Unpublished", value: "unpublished" },
  ];

  return (
    <NeetoPane
      isOpen={isPaneOpen}
      size="small"
      onClose={() => setIsPaneOpen(false)}
    >
      <NeetoPane.Header>
        <Typography style="h2" weight="bold">
          Filters
        </Typography>
      </NeetoPane.Header>
      <NeetoPane.Body>
        <div className="flex w-full flex-col gap-4">
          <Input label="Title" type="text" />
          <Select
            isMulti
            label="Categories"
            options={categoryOptions}
            placeholder="Filter categories"
          />
          <Select
            defaultOption={{ label: "Both", value: "both" }}
            label="Status"
            options={statusOptions}
          />
        </div>
      </NeetoPane.Body>
      <NeetoPane.Footer className="flex gap-4">
        <Button className="black-button--primary" label="Done" />
        <Button
          className="black-button--secondary"
          label="Cancel"
          onClick={() => setIsPaneOpen(false)}
        />
      </NeetoPane.Footer>
    </NeetoPane>
  );
};

export default Pane;
