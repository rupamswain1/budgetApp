import "./App.css";
import "./App.scss";
import { Homepage, LoginPage } from "$pages";
import { NavBar } from "$components";

function App() {
  return (
    <div id="main-content">
      {/* <Homepage/>
      <NavBar/> */}
      <LoginPage />
    </div>
  );
}

export default App;
