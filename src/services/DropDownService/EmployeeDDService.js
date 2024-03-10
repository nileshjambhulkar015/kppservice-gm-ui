import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee";

class EmployeeDDService {

    

    //get regions from company master
    getRegionsFromEmployee(){
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee-kpp/dd-regions-employee")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }  

    //get site from company for region id
     //Get all roles present in department table from designation for KPP
     getSitesByRegionIdFromEmployee(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-sites-employee?regionId=${regionId}`)  
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
        
    }

    // get all company from company base on regio id and site id
    getCompanyFromEmployee(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-company-employee?regionId=${data.regionId}&siteId=${data.siteId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

     // get all company from company base on regio id and site id
     getRolesFromEmployee(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-roles-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    // get all company from company base on regio id and site id
    getDeptFromEmployee(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-dept-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}&roleId=${data.roleId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    // get all company from company base on regio id and site id
    getDesigFromEmployee(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-desig-employee?regionId=${data.regionId}&siteId=${data.siteId}&companyId=${data.companyId}&roleId=${data.roleId}&deptId=${data.deptId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }
}

export default new EmployeeDDService()
