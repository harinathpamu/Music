import React from "react";

export const WidthContext = React.createContext(true);

function WidthProvider(props) {
  const [state, setState] = React.useState(true);
  React.useEffect(() => {
    let x = window.matchMedia("(max-width: 768px)");
    const updater = () => {
      setState(x.matches);
    };
    x.addListener(updater);
    updater();
    return () => {
      x.removeListener(updater);
    };
  }, []);

  return (
    <WidthContext.Provider value={state}>
      {props.children}
    </WidthContext.Provider>
  );
}

export default WidthProvider;
