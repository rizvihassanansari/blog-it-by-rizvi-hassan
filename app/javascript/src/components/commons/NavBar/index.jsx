import React from "react";

import { Avatar } from "@bigbinary/neetoui";

import { LINKS } from "./constants";
import NavLink from "./Link";

const NavBar = () => (
  <div className="fixed left-0 top-0 flex h-full w-14 flex-col items-center gap-4 border-r py-6">
    {LINKS.map(params => (
      <NavLink key={params.to} {...params} />
    ))}
    <Avatar className="mt-auto" />
  </div>
);

export default NavBar;
