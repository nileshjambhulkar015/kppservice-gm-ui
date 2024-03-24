import axios from "axios";
import Cookies from 'js-cookie';


class CumulativeService {

    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

    //For All Employee

    // view previous months kpp 
    getOverallEmployeeCumulative() {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?gmEmpId=${Cookies.get('empId')}&roleId=3`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }


    getOverallEmployeeCumulativeByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?fromDate=${fromDate}&toDate=${toDate}&gmEmpId=${Cookies.get('empId')}&roleId=3&page=0&size=1200`)
            //  return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }


    //for all HOD

    
    // view previous months kpp 
    getOverallHODCumulative() {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?gmEmpId=${Cookies.get('empId')}&roleId=2`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }


    getOverallHODCumulativeByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {
            //roleId=3&deptId=3&desigId=3&reportingEmpId=2
            return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?fromDate=${fromDate}&toDate=${toDate}&gmEmpId=${Cookies.get('empId')}&roleId=2&page=0&size=1200`)
            //  return axios.get(`http://localhost:9091/cumulative/hod-cummulatve?reportingEmpId=${Cookies.get('empId')}&roleId=3&deptId=${Cookies.get('deptId')}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

    // http://localhost:9091/cumulative/hod-cummulatve?fromDate=2024-03-01&toDate=2024-03-23&roleId=3&reportingEmpId=2

    //when HOD want to view single employee kpp ratings

    // view previous months kpp 
    getSingleEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleEmpIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

    // view previous months kpp  bt from date and to date
    getSingleEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('viewSingleEmpIdForKppRatings')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }


//for HOD flow

       // view previous months kpp 
       getSingleHODKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?empId=${Cookies.get('viewSingleHODIdForKppRatings')}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

    // view previous months kpp  bt from date and to date
    getSingleHODKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(`http://localhost:9091/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('viewSingleHODIdForKppRatings')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }


}


export default new CumulativeService();