import "./App.css";
import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store"
import { Homepage, LoginPage } from "$pages";
import { NavBar } from "$components";

function App() {
  return (
    <div id="main-content">
      <Provider store={store}>
      {/* <Homepage/>
      <NavBar/> */}
      <LoginPage />
      </Provider>
    </div>
  );
}

export default App;
