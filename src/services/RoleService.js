import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL="http://localhost:9091/roles";

class RoleService{

    getRoles(){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    saveRolesDetails(role){
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL,role)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    getRoleById(roleId){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+'/'+roleId)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    updateRoleDetails(role){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, role)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }         
    }
    
    getRolesDetailsByPaging(){
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/roles/search?searchEnum=BY_STATUS&statusCdEnum=A&page=0&size=20&sort=roleName")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }  
    }

    getRolesDetailsByRoleNamePaging(roleName){
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/roles/search?searchEnum=BY_NAME&searchString=${roleName}&statusCdEnum=A&page=0&size=20&sort=roleName`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

     //Get all roles present in designation table 
     getRolesInDesignation(){
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/roles/designation/roles")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }        
    }   
}

export default new RoleService();