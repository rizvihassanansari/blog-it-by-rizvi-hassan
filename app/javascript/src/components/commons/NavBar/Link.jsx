import React from "react";

import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Link = ({ to, icon: Icon }) => (
  <NavLink
    exact
    to={to}
    className={isActive =>
      classNames(
        "naked aspect-square rounded-md p-1 transition-all duration-300",
        {
          "black-button--primary": isActive,
          "black-button--secondary": !isActive,
        }
      )
    }
  >
    <Icon />
  </NavLink>
);

export default Link;
