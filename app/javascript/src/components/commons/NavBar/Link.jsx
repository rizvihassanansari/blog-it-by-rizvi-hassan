import React from "react";

import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Link = ({ to, icon: Icon, className }) => (
  <NavLink
    exact
    to={to}
    className={isActive =>
      classNames(
        {
          "black-button--primary": isActive,
          "black-button--secondary": !isActive,
        },
        [
          "naked aspect-square rounded-md p-1 transition-all duration-300",
          className,
        ]
      )
    }
  >
    <Icon />
  </NavLink>
);

export default Link;
