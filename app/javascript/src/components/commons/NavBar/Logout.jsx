import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import { useLogout } from "../../../hooks/reactQueries/useAuthApi";
import UserAvatar from "../Avatar";

const Logout = ({ name, email }) => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <UserAvatar
        showName
        className="mb-1 border-b pb-2"
        size="large"
        user={{ name, email }}
      />
      <Button
        icon={LeftArrow}
        iconPosition="left"
        label="Logout"
        style="text"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Logout;
