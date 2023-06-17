const defaultCellValue = `
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.min.css";

import { Button } from "react-bulma-components";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 10,
          height: "100vh",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 40,
        }}
      >
        {count}
        <Button color="primary" onClick={() => setCount((count) => count + 1)}>
          Click Me to Increment
        </Button>
      </div>
    </Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

export default defaultCellValue;
