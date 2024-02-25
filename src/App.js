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
import EmplyeeUpdateKppRatingsComponent from './components/EmplyeeUpdateKppRatingsComponent/EmplyeeUpdateKppRatingsComponent';
import AddHodKppsRatingComponent from './components/AddHodKppsRatingComponent/AddHodKppsRatingComponent';
import AddNewEmployeeComponent from './components/AddNewEmployeeComponent/AddNewEmployeeComponent';
import ShowEmployeeForKppComponent from './components/ShowEmployeeForKppComponent/ShowEmployeeForKppComponent';
import AssignEmployeeKppComponent from './components/AssignEmployeeKppComponent/AssignEmployeeKppComponent';
import HODUpdateKppRatingsComponent from './components/HODUpdateKppRatingsComponent/HODUpdateKppRatingsComponent';


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

          <li><Link to="/keyparemeter">Key Indicator Master</Link></li>
          <li><Link to="/employee">Employee Master</Link></li>
          
           
            <li><Link to="/showEmployeeForKpp">Assign Employee Kpp</Link></li>
            <li><Link to="/allHodKppStatus">HOD KPP</Link></li>
           
            <li><Link to="/allEmployeeKppStatus">Employee KPP</Link></li>
            

            <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Master Records
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
            <li><Link to="/role">Role Master</Link></li>
            <li><Link to="/department">Department Master</Link></li>
            <li><Link to="/designation">Designation Master</Link></li>
            <li><Link to="/employeekpp">Region Master</Link></li>
            <li><Link to="/employeekpp">Sites Master</Link></li>
            <li><Link to="/employeekpp">UoM Master</Link></li>
        
            </ul>
          </li>

          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li> <a href="http://localhost:3008" onClick={() => removeCookies()} >Logout </a></li>
          </ul>
        </div>
      </nav>
      <Routes>
      <Route exact path="/" element={<RoleComponent />}></Route>
   
        <Route exact path="/newEmployee" element={<AddNewEmployeeComponent />}></Route>
        <Route exact path="/role" element={<RoleComponent />}></Route>
        <Route exact path="/department" element={<DepartmentComponent />}></Route>
        <Route exact path="/designation" element={<DesignationComponent />}></Route>
        <Route exact path="/keyparemeter" element={<KeyParameterComponent />} ></Route>
        <Route exact path="/employee" element={<EmployeeComponent />}></Route>
        <Route exact path="/showEmployeeForKpp" element={<ShowEmployeeForKppComponent / >}></Route>
      
        <Route exact path="/allHodKppStatus" element={<AllHodKppStatusComponent />}></Route>
        <Route exact path="/addHodKppRating" element={<HODUpdateKppRatingsComponent />}></Route>
        
        <Route exact path="/allEmployeeKppStatus" element={<AllEmployeesKppComponent />}></Route>
        <Route exact path="/addEmployeeKppRating" element={<EmplyeeUpdateKppRatingsComponent />}></Route>


        <Route exact path="/assignEmployeeKpp" element={<AssignEmployeeKppComponent />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
