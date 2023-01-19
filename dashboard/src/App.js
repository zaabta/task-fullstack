import { Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/sign-in"  element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <Main>
              <Home />
            </Main>
          }
        />
        <Route
          exact
          path="/tables"
          element={
            <Main>
              <Tables />
            </Main>
          }
        /> 
        <Route
          exact
          path="/profile"
          element={
            <Main>
              <Profile />
            </Main>
          }
        />
        <Route
          path="*"
          element={
            <Main>
              <Home />
            </Main>
          }
        />
      </Switch>
    </div>
  );
}

export default App;
