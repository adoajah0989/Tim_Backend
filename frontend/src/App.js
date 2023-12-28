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
import LapdiView from "./components/LabdiView";
import LapdiForm from "./components/lapdiForm";
import MutasiView from "./components/mutasiView";
import BAPList from "./components/BAPList";
import Darurat from "./components/darurat";
import ExpedisiView from "./components/ExpedisiView";
import AssetView from "./components/AssetView";


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
            <div className="container d-flex">
              <div className="row-cols-2">
                <label>test</label>
              </div>
            </div>
              <Navbar />
              <Dashboard />
              <Sevenbox />
            </>
          </Route>


          <Route path="/patroli">
            <>

            <Navbar/>
            <PatroliList />
            </>
          </Route>

          <Route path="/tamu">
            <>
              <Navbar />
              <GuestView />
            </>
          </Route>
          <Route path="/lapdi">
            <>
              <LapdiView />
            </>
          </Route>

          <Route path="patroli/add">
            <AddPatroli />
          </Route>
          <Route path="edit/:id">
            <EditPatroli />
          </Route>
          <Route path="/lapdiForm">
          <>
            {/* <Navbar /> */}
            <LapdiForm/>
            </>
          </Route>
          
          <Route path="/mutasi">
            <>
            <Navbar/>
            <MutasiView/>
            </>
          </Route>
          <Route path="/bap">
            <>
            <Navbar/>
            <BAPList/>
            </>
          </Route>
          <Route path="/darurat">
          <>
          <Navbar/>
            <Darurat/>
            </>
          </Route>
          <Route path="/ekspedisi">
          <>
          <Navbar/>
            <ExpedisiView/>
            </>
          </Route>
          <Route path="/asset">
          <>
          <Navbar/>
            <AssetView/>
            </>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
