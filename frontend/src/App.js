import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Sevenbox from "./components/sevenBox";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <>
              <Dashboard />
              <Sevenbox />
              {/* <Sidebar /> */}
            </>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
