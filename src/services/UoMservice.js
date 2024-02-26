import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/uom";


class UoMservice {


    saveUoMDetails(uom) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, uom)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //when click on view button of UI
    getUoMById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-dept-id?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    updateUoM(uom) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, uom)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


    //at page load call all the region load all departments
    getUoMByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/uom/search?statusCd=A&page=0&size=1200&sort=regionName asc")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }


    getUoMById(uomId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/uom?uomId=${uomId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

}


export default new UoMservice();