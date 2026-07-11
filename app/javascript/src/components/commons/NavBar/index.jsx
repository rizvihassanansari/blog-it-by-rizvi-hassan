/* eslint-disable import/order */
import React from "react";

import { LINKS } from "./constants";
import NavLink from "./Link";
import UserAvatar from "../Avatar";

const NavBar = () => (
  <div className="relative left-0 top-0 flex h-full w-14 flex-col items-center gap-4 border-r py-6">
    {LINKS.map(params => (
      <NavLink key={params.to} {...params} />
    ))}
    <UserAvatar className="mt-auto" user={{ name: "Rizvi Hassan" }} />
  </div>
);

export default NavBar;
