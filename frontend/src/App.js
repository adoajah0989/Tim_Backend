import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PatroliList from "./components/PatroliList";
import AddPatroli from "./components/AddPatroli";
import Sevenbox from "./components/sevenbox";
import GuestView from "./components/GuestView";
import EditPatroli from "./components/EditPatroli";
import Footer from "./components/footer";



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
              <Navbar />
              <Dashboard />
              <Sevenbox />
              <Footer/>
            </>
          </Route>

          <Route path="/patroli">
            <PatroliList />
          </Route>

          <Route path="/tamu">
            <>
              <Navbar />
              <GuestView />
            </>
          </Route>

          <Route path="patroli/add">
            <AddPatroli />
          </Route>
          <Route path="edit/:id">
            <EditPatroli />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
