import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee-key-perform-parameter/kpp?roleId=1&deptId=1&desigId=1&statusCdEnum=A";


class EmployeeKppsService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
           
            return axios.get(`http://localhost:9091/employee-kpp-status?empId=${Cookies.get('empIdForKppRatings')}`)
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

    //Assign employee kpp for assign kpp page
    assignEmployeeKppDetails(emplyeeKpp){
        if (null != Cookies.get('empId')) {
            console.log("Service =",emplyeeKpp)
            return axios.post("http://localhost:9091/employee-kpp/assign-kpp",emplyeeKpp)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }
}


export default new EmployeeKppsService();