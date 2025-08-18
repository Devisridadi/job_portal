import Home from "./home";
import Register from "./Register";
import Login from "./login";
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
          <BrowserRouter>
               <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/Register" element={<Register/>} />
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/employer-dashboard" element={<employer-dashboard />} />
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
               </Routes>
          </BrowserRouter>
  );
};

export default App;