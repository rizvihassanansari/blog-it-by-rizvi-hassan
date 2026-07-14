/* eslint-disable import/order */
import React, { useRef, useState } from "react";

import { LINKS } from "./constants";
import NavLink from "./Link";
import UserAvatar from "../Avatar";
import classNames from "classnames";
import { Book, ListDetails } from "@bigbinary/neeto-icons";
import { Button, Popover } from "@bigbinary/neetoui";
import CategoryBar from "../CategoryBar";
import { getFromLocalStorage } from "../../../utils/storage";
import Logout from "./Logout";

const NavBar = () => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const avatarRef = useRef(null);

  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const handleClick = () => {
    setIsCategoryVisible(previous => !previous);
  };

  return (
    <main className="relative z-10 flex h-screen w-fit">
      <div className="relative left-0 top-0 flex h-full w-14 flex-col items-center gap-4 border-r py-6">
        <Button
          className="naked black-button--primary aspect-square rounded-md p-1"
          icon={Book}
          size="large"
          type="button"
        />
        <hr className="w-full" />
        {LINKS.map(params => (
          <NavLink key={params.to} {...params} />
        ))}
        <hr className="w-full" />
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
        <div className="mt-auto" ref={avatarRef}>
          <UserAvatar user={{ name }} />
        </div>
        <Popover reference={avatarRef}>
          <Logout {...{ name, email }} />
        </Popover>
      </div>
      <CategoryBar isVisible={isCategoryVisible} />
    </main>
  );
};

export default NavBar;
