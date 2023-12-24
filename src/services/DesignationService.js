import axios from "axios";
import Cookies from 'js-cookie';

const DEPARTMENT_URL = "http://localhost:9091/department";
const DESIGNATION_URL = "http://localhost:9091/designation";

class DesignationService {

    getDpartmentDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(DEPARTMENT_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

    //get all designation from department id for dropdown list
    getDesignationDetailsForKpp(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(DESIGNATION_URL + '/by/' + deptId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }



    getDesignationDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/designation/search?statusCd=A&page=0&size=20&sort=role.role_id")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }      
    }


    getDesignationDetailsByDesigNamePaging(desigName) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/designation/search?desigName=${desigName}&statusCd=A&page=0&size=20&sort=desig.desigName`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }
    saveDesignationDetails(designation) {
        if (null != Cookies.get('empId')) {
            return axios.post(DESIGNATION_URL, designation)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

    getDesignationById(desigId) {
        if (null != Cookies.get('empId')) {
            return axios.get(DESIGNATION_URL + '/' + desigId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    updateDesignationDetails(designation) {
        if (null != Cookies.get('empId')) {
            return axios.put(DESIGNATION_URL, designation)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

}

export default new DesignationService()