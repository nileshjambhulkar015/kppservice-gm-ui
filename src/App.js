import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, BrowserRouter, Link, Routes } from 'react-router-dom';
import KeyParameterComponent from './components/KeyParameterComponent/KeyParameterComponent';

import EmployeeComponent from './components/EmployeeComponent/EmployeeComponent';
import DesignationComponent from './components/DesignationComponent/DesignationComponent';

import DepartmentComponent from './components/DepartmentComponent/DepartmentComponent';
import RoleComponent from "./components/RoloComponent/RoleComponent";
import Cookies from 'js-cookie';
import AllEmployeesKppComponent from "./components/AllEmployeesKppComponent/AllEmployeesKppComponent";
import AllHodKppStatusComponent from './components/AllHodKppStatusComponent/AllHodKppStatusComponent';
import AddEmployeeKppsRatingComponent from './components/AddEmployeeKppsRatingComponent/AddEmployeeKppsRatingComponent';
import AddHodKppsRatingComponent from './components/AddHodKppsRatingComponent/AddHodKppsRatingComponent';


function App() {
 
  const removeCookies = () => {
    Cookies.remove('empId');
    Cookies.remove('roleId');
    Cookies.remove('roleName');
    Cookies.remove('deptId');
    Cookies.remove('deptName');
    Cookies.remove('desigId');
    Cookies.remove('desigName');
    Cookies.remove('empEId');
    Cookies.remove('empFirstName');
    Cookies.remove('empMiddleName');
    Cookies.remove('empLastName');
  }
  return (

    <BrowserRouter>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://localhost:3008" onClick={() => removeCookies()}>FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">

            <li><Link to="/role">Role</Link></li>
            <li><Link to="/department">Department</Link></li>
            <li><Link to="/designation">Designation</Link></li>
            <li><Link to="/employee">Employee</Link></li>
            <li><Link to="/keyparemeter">Key Indicator</Link></li>
            <li><Link to="/allHodKppStatus">HOD KPP</Link></li>
           
            <li><Link to="/allEmployeeKppStatus">Employee KPP</Link></li>
            <li><Link to="/employeekpp">View Profile</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li> <a href="http://localhost:3008" onClick={() => removeCookies()} >Logout </a></li>
          </ul>
        </div>
      </nav>
      <Routes>

        <Route exact path="/" element={<RoleComponent />}></Route>
        <Route exact path="/role" element={<RoleComponent />}></Route>
        <Route exact path="/department" element={<DepartmentComponent />}></Route>
        <Route exact path="/designation" element={<DesignationComponent />}></Route>
        <Route exact path="/employee" element={<EmployeeComponent />}></Route>
        <Route exact path="/keyparemeter" element={<KeyParameterComponent />} ></Route>
        <Route exact path="/allHodKppStatus" element={<AllHodKppStatusComponent />}></Route>
        <Route exact path="/addHodKppRating/:empId" element={<AddHodKppsRatingComponent />}></Route>
        <Route exact path="/allEmployeeKppStatus" element={<AllEmployeesKppComponent />}></Route>
        <Route exact path="/addEmployeeKppRating/:empId" element={<AddEmployeeKppsRatingComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
