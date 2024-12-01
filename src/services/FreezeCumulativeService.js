import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API + "/freeze-cumulative";

class FreezeCumulativeService {

    saveFreezeEmployeeKppReport(freezeCumulativeCreateRequest) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, freezeCumulativeCreateRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


}


export default new FreezeCumulativeService();