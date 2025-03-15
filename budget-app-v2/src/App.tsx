import "./App.css";
import "./App.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import {
  BrowserRouter as Router
} from "react-router";
import Layout from "./layout";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <div id="main-content">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout />
        </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
