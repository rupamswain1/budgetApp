import "./App.css";
import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  BrowserRouter as Router
} from "react-router";
import Layout from "./layout";

function App() {
  return (
    <div id="main-content">
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
