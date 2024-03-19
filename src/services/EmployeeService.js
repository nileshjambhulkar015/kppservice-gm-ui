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

    //Show Employee For Kpp based on designation
    getEmployeeDetailsByDesignationByPaging(desigId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee/search?desigId=${desigId}&statusCd=A&page=0&size=20&sort=emp.emp_fname`);
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

    //get regions from company master
    getRegionsFromCompany(){
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/company-master/dd-regions-company")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }  

    //get site from company for region id
     //Get all roles present in department table from designation for KPP
     getSitesByRegionIdFromCompany(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/company-master/dd-region-site?regionId=${regionId}`)  
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
        
    }

    // get all company from company base on regio id and site id
    getCompanyFromComany(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/company-master/dd-company-company?regionId=${data.regionId}&siteId=${data.siteId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

     
}


export default new EmployeeService()
