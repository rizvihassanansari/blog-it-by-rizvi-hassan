import React from "react";

import { Book } from "@bigbinary/neeto-icons";
import { Avatar, Button } from "@bigbinary/neetoui";
import classNames from "classnames";

const NavBar = () => (
  <div className="fixed left-0 top-0 flex h-full w-14 flex-col items-center gap-4 border-r bg-slate-50 py-6">
    <Button
      icon={Book}
      className={classNames(
        "aspect-square focus:shadow-none focus-visible:shadow-none",
        { "bg-black text-white": true }
      )}
    />
    <Button
      icon={Book}
      // style="text"
      className={classNames(
        "aspect-square bg-white text-black focus:shadow-none focus-visible:shadow-none",
        { "bg-black text-white": false }
      )}
    />
    <Avatar className="mt-auto" />
  </div>
);

export default NavBar;
