import React from "react";

function ListItemHeader(props) {
  return (
    <h4 className="light sticky-top bg-white m-0" {...props}>
      {props.children}
    </h4>
  );
}
export default ListItemHeader;
