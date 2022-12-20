import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
 import Main from './Components/Main';
import Login from './Components/Login';
import Registration from './Components/Registration'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RegVehicle from './Components/RegVehicle';
import VehicleDashboard from './Components/VehicleDashboard';
import Account from './Components/Account';
import AdminDashboard from './Components/AdminDashboard';
import AdminUsers from './Components/AdminUsers';
import AdminVehicles from './Components/AdminVehicles';
import AdminClaims from './Components/AdminClaims';
import Quotes from './Components/Quotes';
import ClaimDashboard from './Components/ClaimDashboard';
import RegClaim from './Components/RegClaim';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { getRole } from './jwtDetails.js';

export default function App() {
  document.body.style = 'background: #FAFAFF;';
  document.body.style = "font-family: 'Monospace';";

  function checkJwt() {
    if(localStorage.getItem("jwt") === null) {
      return false;
    }
    return true;
  }

  function checkAdmin() {
    if(checkJwt() && getRole() === 'ADMIN') {
      return true;
    }
    return false;
  }

  return (
    <div>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Registration" element={<Registration />} />
              <Route exact path="/VehicleDashboard" element={checkJwt() ? <VehicleDashboard /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/RegVehicle" element={checkJwt() ? <RegVehicle /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/Account" element={checkJwt() ? <Account /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/AdminDashboard" element={checkAdmin() ? <AdminDashboard /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/AdminVehicles" element={checkAdmin() ? <AdminVehicles /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/AdminUsers" element={checkAdmin() ? <AdminUsers /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/AdminClaims" element={checkAdmin() ? <AdminClaims /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/Quotes" element={checkJwt() ? <Quotes /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/ClaimDashboard" element={checkJwt() ? <ClaimDashboard /> : <Navigate to="/Login" replace={true}/>} />
              <Route exact path="/RegClaim" element={checkJwt() ? <RegClaim /> : <Navigate to="/Login" replace={true}/>} />
            </Routes>
            <Footer />
          </div>
        </Router>
    </div>
  );
}