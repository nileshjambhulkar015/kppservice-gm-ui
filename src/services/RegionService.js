import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/region";


class RegionService {


    saveRegionDetails(region) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, region)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //when click on view button of UI
    getDepartmentById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-dept-id?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    updateRegion(region) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, region)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


    //at page load call all the region load all departments
    getRegionsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/region/search?statusCd=A&page=0&size=1200&sort=regionName asc")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }


    getRegionsById(regionId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/region?regionId=${regionId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

}


export default new RegionService();