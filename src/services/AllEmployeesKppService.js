import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = `http://localhost:9091/employee/employee-kpp-status?reportingEmployee=${Cookies.get('empId')}&page=0&size=20&sort=desig.desig_name`;

class AllEmployeesKppService {

    getEmployeeDetailsByPagination() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }

    }

    getEmployeeByStatusByPagination(empKppStaus) {
        if (null != Cookies.get('empId')) {
            console.log("empKppStaus=",empKppStaus)
            return axios.get(`http://localhost:9091/employee/employee-kpp-status?reportingEmployee=${Cookies.get('empId')}&empKppStatus=${empKppStaus}&page=0&size=20&sort=desig.desig.name`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }

    }

}


export default new AllEmployeesKppService();