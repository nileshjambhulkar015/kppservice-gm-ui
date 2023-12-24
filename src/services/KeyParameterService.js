import axios from "axios";
import Cookies from 'js-cookie';

const DEPARTMENT_URL = "http://localhost:9091/designation/department";
const BASE_URL = "http://localhost:9091/key-perform-parameter";

class KeyParameterService {


    getDpartmentDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(DEPARTMENT_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    saveKPPDetails(kpp) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, kpp)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getKPPDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/key-perform-parameter/search?statusCd=A&page=0&size=20&sort=dept.dept_name");
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }


    getKPPDetailsByKppObjectivePaging(kppObjective) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/key-perform-parameter/search?kppObjective=${kppObjective}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getKppById(kppId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + kppId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getDepartmentById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + deptId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    updateKppDetails(kpp) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, kpp)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }
}

export default new KeyParameterService()
