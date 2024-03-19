import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee-type";


class EmployeeTypeService {

    saveEmployeeTypeDetails(employeeType) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, employeeType)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //when click on view button of UI
    getEmployeeTypeById(empTypeId) {
        if (null != Cookies.get('empId')) {
     
            return axios.get(BASE_URL + `?empTypeId=${empTypeId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    updateEmployeeTypeDetails(employeeType) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employeeType)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


    //at page load call all the departments load all departments
    getEmployeeTypeDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee-type?statusCd=A")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

   
    //Get all roles present in department table for designation form
    getDDEmployeeType() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee-type?statusCd=A")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }





 
     

}


export default new EmployeeTypeService();