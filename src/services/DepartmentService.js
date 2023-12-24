import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/department";


class DepartmentService {

    getDpartmentDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    saveDpartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, department)
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

    updateDepartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, department)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }


    getDpartmentDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/department/search?statusCd=A&page=0&size=20&sort=role.role_name asc")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getDpartmentDetailsByDeptNamePaging(deptName) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/department/search?deptName=${deptName}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //Get all roles present in department table for designation form
    getRolesInDept() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/roles/department/role")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

    //Get all roles present in department table for designation form
    getDepartmentByRoleId(roleId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/dept/' + roleId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
       
    }

    //Get all roles present in department table from designation for KPP
    getDepartmentByRoleIdFromDesign(roleId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/desig/' + roleId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
        
    }

}


export default new DepartmentService();