import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";

function App() {
  return (
    <HashRouter>
      <div className="App" />
      {routes}
    </HashRouter>
  );
}

export default App;
