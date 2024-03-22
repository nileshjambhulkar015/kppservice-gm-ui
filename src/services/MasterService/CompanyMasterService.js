import axios from "axios";
import Cookies from 'js-cookie';



class CompanyMasterService {

    saveCompanyDetails(company) {
        if (null != Cookies.get('empId')) {
            return axios.post("http://localhost:9091/company-master", company)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

    getCompanyById(companyId) {
        if (null != Cookies.get('empId')) {
            return axios.get(`http://localhost:9091/company-master/by-comp-id?companyId=${companyId}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    
    getCompanyDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/company-master/search?statusCd=A&page=0&size=20&sort=region_id")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }      
    }

    updateCompanyDetails(company) {
        if (null != Cookies.get('empId')) {
            return axios.put("http://localhost:9091/company-master", company)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getAllCompanyies() {
        if (null != Cookies.get('empId')) {
            return axios.get("http://localhost:9091/company-master/dd-all-company")
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }       
    }

}

export default new CompanyMasterService()