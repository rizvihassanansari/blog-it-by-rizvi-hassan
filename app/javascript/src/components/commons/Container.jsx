import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import NavBar from "./NavBar";

const Container = ({ children, className = "" }) => (
  <>
    <NavBar />
    <div
      className={classnames("mx-auto max-w-6xl bg-blue-100 px-6", [className])}
    >
      {children}
    </div>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
