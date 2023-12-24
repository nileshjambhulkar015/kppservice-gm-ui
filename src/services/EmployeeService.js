import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee";

class EmployeeService {

    //Get all roles present in designation table 
    getRolesInDesignation() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/roles/designation/roles")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    saveEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }     
    }

    getEmployeeDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee/search?statusCd=A&page=0&size=20&sort=emp.emp_fname");
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

    getEmployeeDetailsByEmpFirstNamePaging(empFirstName) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee/search?empFirstName=${empFirstName}&statusCd=A&page=0&size=20&sort=emp.emp_name`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + empId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }

    

    updateEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }           
    }

    getEmployeeSuggest(reportingEmpDesigId) {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee/reportToEmpName?desigId=" + reportingEmpDesigId);
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }         
    }
}

export default new EmployeeService()
