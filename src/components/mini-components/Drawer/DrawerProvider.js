import React from "react";

export const DrawerContext = React.createContext(false);

function DrawerProvider(props) {
  const [state, setState] = React.useState(false);

  const onChangeNav = value => {
    setState(value);
  };

  return (
    <DrawerContext.Provider value={{ open: state, onChangeNav: onChangeNav }}>
      {props.children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
