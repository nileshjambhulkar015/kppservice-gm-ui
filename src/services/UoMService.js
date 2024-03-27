import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+"/uom";


class UoMService {


    saveUoMDetails(uom) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, uom)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
    getUoMById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-dept-id?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateUoM(uom) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, uom)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the region load all departments
    getUoMByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/uom/search?statusCd=A&page=0&size=1200&sort=regionName asc")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

      //to show uom for adding kpp
      getAllUoM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/uom/all-uom")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getUoMById(uomId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/uom?uomId=${uomId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new UoMService();