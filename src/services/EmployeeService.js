import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+"/employee";

class EmployeeService {

    //Get all roles present in designation table 
    getRolesInDesignation() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/roles/designation/roles")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    saveEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }     
    }

    getEmployeeDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/employee/search?statusCd=A&page=0&size=20&sort=emp.emp_fname");
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    //Show Employee For Kpp based on designation
    getEmployeeDetailsByDesignationByPaging(desigId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/employee/search?desigId=${desigId}&statusCd=A&page=0&size=20&sort=emp.emp_fname`);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    getEmployeeDetailsByEmpFirstNamePaging(empFirstName) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/employee/search?empFirstName=${empFirstName}&statusCd=A&page=0&size=20&sort=emp.emp_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }        
    }

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + empId)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }        
    }

    updateEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }           
    }

    getEmployeeSuggest(reportingEmpDesigId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/employee/reportToEmpName?desigId=" + reportingEmpDesigId);
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }         
    }

    //get regions from company master
    getRegionsFromCompany(){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/company-master/dd-regions-company")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }        
    }  

    //get site from company for region id
     //Get all roles present in department table from designation for KPP
     getSitesByRegionIdFromCompany(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/company-master/dd-region-site?regionId=${regionId}`)  
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
        
    }

    // get all company from company base on regio id and site id
    getCompanyFromComany(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/company-master/dd-company-company?regionId=${data.regionId}&siteId=${data.siteId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

      //advance search of employee
      advanceSearchEmployee(advEmployeeSearch) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/employee/adv-search?page=0&size=200", advEmployeeSearch)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
     
}


export default new EmployeeService()
