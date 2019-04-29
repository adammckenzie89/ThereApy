import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import Header from "./components/header/Header";

function App() {
  return (
    <HashRouter>
      <div className="App" />
      <Header />
      {routes}
    </HashRouter>
  );
}

export default App;
