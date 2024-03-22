import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/site";


class SiteService {


    saveSiteDetails(site) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, site)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


  

    //http://localhost:9091/site/dd-search-sites?siteId=1
    //when click on view button of UI
    getSiteById(siteId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-site-id?siteId=${siteId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    updateSiteDetails(site) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, site)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


    //at page load call all the departments load all departments
    getSiteDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/site/search?statusCd=A&page=0&size=20&sort=site_name")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    

    //Get all regions present in site table for site form
    getRegionInDept() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/roles/department/role")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //Get all roles present in department table for designation form
    getAllRegions() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/site/dd-regions-sites")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
       
    }

    //Get all sites present in department table from designation for KPP
    getSiteDetailsByRegionId(regionId) {
        console.log("Site Service regionid=", regionId)
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/site/dd-sites-sites?regionId=${regionId}`)  
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
        
    }

    getAllSites() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/site/dd-all-sites")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

}


export default new SiteService();