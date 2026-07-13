/* eslint-disable import/order */
import React, { useState } from "react";

import { LINKS } from "./constants";
import NavLink from "./Link";
import UserAvatar from "../Avatar";
import classNames from "classnames";
import { ListDetails } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import CategoryBar from "../CategoryBar";
import { getFromLocalStorage } from "../../../utils/storage";

const NavBar = () => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const name = getFromLocalStorage("authUserName");

  const handleClick = () => {
    setIsCategoryVisible(previous => !previous);
  };

  return (
    <main className="relative flex h-screen w-fit">
      <div className="relative left-0 top-0 flex h-full w-14 flex-col items-center gap-4 border-r py-6">
        {LINKS.map(params => (
          <NavLink key={params.to} {...params} />
        ))}
        <Button
          icon={ListDetails}
          size="large"
          type="button"
          className={classNames(
            "naked aspect-square rounded-md p-1 transition-all duration-300",
            {
              "black-button--primary": isCategoryVisible,
              "black-button--secondary": !isCategoryVisible,
            }
          )}
          onClick={handleClick}
        />
        <UserAvatar className="mt-auto" user={{ name }} />
      </div>
      <CategoryBar isVisible={isCategoryVisible} />
    </main>
  );
};

export default NavBar;
