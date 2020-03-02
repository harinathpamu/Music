import React from "react";

function PageContainer(props) {
  return <div className="d-flex flex-column h-100">{props.children}</div>;
}

export default PageContainer;
