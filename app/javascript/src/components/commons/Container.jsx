import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import NavBar from "./NavBar";

const Container = ({ children, className = "" }) => (
  <main className=" flex h-screen w-full overflow-hidden">
    <NavBar />
    <div className="h-screen w-full overflow-scroll">
      <div
        className={classnames("mx-auto h-fit max-w-6xl px-6 pt-12", [
          className,
        ])}
      >
        {children}
      </div>
    </div>
  </main>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
