import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+`/employee/employee-kpp-status?empKppStatus=In-Progress&roleId=2&page=0&size=20&sort=desig.desig_name`;

class AllHodKppService {

    getEmployeeDetailsByPagination() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getEmployeeByStatusByPagination(empKppStaus) {
        if (null != Cookies.get('empId')) {
            console.log("empKppStaus=",empKppStaus)
            //for GM need to send this
           // return axios.get(BASE_URL_API+`/employee/employee-kpp-status?reportingEmployee=${Cookies.get('empId')}&roleId=2&empKppStatus=${empKppStaus}&page=0&size=20&sort=desig.desig.name`)

           //for admin we need to fetch all in progress kpp request
           return axios.get(BASE_URL_API+`/employee/employee-kpp-status?roleId=2&empKppStatus=${empKppStaus}&page=0&size=20&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     
    completeEmpKppGM(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/gm-approval/finish?empId=${empId}&statusCd=A`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new AllHodKppService();