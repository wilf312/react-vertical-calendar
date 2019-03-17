import * as React from "react";
import { render } from "react-dom";
import State from "./State";

const App = () => {
  return (
    <div className="App">
      <State />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
