import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Sevenbox from "./components/sevenBox";
import GuestView from "./components/GuestView";
import Navbar from "./components/NavBar";
import MutasiView from "./components/mutasiView";

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
              
              <Navbar/>
              <Dashboard />
              <Sevenbox />
              {/* <Sidebar /> */}
            </>
          </Route>
          <Route path="/tamu">
          <>
            <Navbar />
            <GuestView />
            </>
          </Route>
          <Route path="/mutasi">
          <>
            <Navbar />
            <MutasiView />
            </>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
