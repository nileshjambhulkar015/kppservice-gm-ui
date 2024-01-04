import axios from "axios";
import Cookies from 'js-cookie';
//import { KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./HodConstants";
//const BASE_URL = `http://localhost:9091/hod-approval/employee-kpp?empId=${}&statusCd=A`;

class EmployeeKppService {


    getKPPDetails(empId) {
        console.log("new emop Id : ", empId)
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/hod-approval/employee-kpp?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    saveEmployeeKppDetails(todos){
     
        if (null != Cookies.get('empId')) {
            return axios.put("http://localhost:9091/employee-key-perform-parameter",todos)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    updateEmpArroveOrRejectByHod(todos){
     
        if (null != Cookies.get('empId')) {
            return axios.put("http://localhost:9091/gm-approval",todos)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    completeEmpKppGM(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/gm-approval/report?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }

    }

  
}


export default new EmployeeKppService();