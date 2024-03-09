import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee";

class EmployeeDDService {

    

    //get regions from company master
    getRegionsFromEmployee(){
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/employee-kpp/dd-regions-company")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }  

    //get site from company for region id
     //Get all roles present in department table from designation for KPP
     getSitesByRegionIdFromEmployee(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-region-site?regionId=${regionId}`)  
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
        
    }

    // get all company from company base on regio id and site id
    getCompanyFromEmployee(data) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/employee-kpp/dd-company-company?regionId=${data.regionId}&siteId=${data.siteId}`)
           
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }
}

export default new EmployeeDDService()
