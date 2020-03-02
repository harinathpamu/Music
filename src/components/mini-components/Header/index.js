import React from "react";

import { WidthContext } from "../../global/WidthProvider";
import { DrawerContext } from "../Drawer/DrawerProvider";

// third-party

//Material Icons from react-icons
import { MdMenu } from "react-icons/md";

function Header(props) {
  const value = React.useContext(DrawerContext);
  const isMatched = React.useContext(WidthContext);

  return (
    <div
      className={`d-flex flex-row align-items-center p-2${
        isMatched ? " shadow-sm" : ""
      }`}
    >
      <MdMenu
        className="py-1 mr-1 d-md-none hand"
        size="35px"
        color="#000"
        onClick={() => value.onChangeNav(true)}
      />

      <span className="align-middle light m-0 h5 d-md-none">
        {props.children}
      </span>
      <span className="align-middle light m-0 h2 d-none d-md-block">
        {props.children}
      </span>
    </div>
  );
}
export default Header;
