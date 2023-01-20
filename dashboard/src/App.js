import { Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import LogOut from "./pages/LogOut"
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
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<Main />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route exact path="/tables" element={<Tables />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/log-out" element={<LogOut />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
