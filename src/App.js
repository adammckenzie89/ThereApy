import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App" />
        {routes}
      </HashRouter>
    </Provider>
  );
}

export default App;
