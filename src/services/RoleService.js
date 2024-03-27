import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL=BASE_URL_API+"/roles";

class RoleService{

    //load roles dropdown for list
    getRolesForDropdown(){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+'/all')
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    saveRolesDetails(role){
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL,role)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    getRoleById(roleId){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+'/'+roleId)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    updateRoleDetails(role){
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, role)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }         
    }
    
    getRolesDetailsByPaging(){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/roles/search?searchEnum=BY_STATUS&statusCdEnum=A&page=0&size=20&sort=roleName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    getRolesDetailsByRoleNamePaging(roleName){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/roles/search?searchEnum=BY_NAME&searchString=${roleName}&statusCdEnum=A&page=0&size=20&sort=roleName`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

     //Get all roles present in designation table 
     //second used in adding new employee
     getRoles(){
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/roles")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }        
    }  

        //Get all roles present in department table for designation form
        ddRolesExceptGM() {
            if (null != Cookies.get('empId')) {
                return axios.get(BASE_URL_API+"/roles/dd-role-except-gm-role")
            } else {
                alert("You need to login first")
                window.location.replace(LOGIN_UI_BASE_URL);
            }
    
        }
    
    
}

export default new RoleService();