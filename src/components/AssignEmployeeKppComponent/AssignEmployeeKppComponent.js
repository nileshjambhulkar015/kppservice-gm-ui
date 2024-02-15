import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyParameterService from "../../services/KeyParameterService";
import Cookies from 'js-cookie';
import EmployeeKppsService from "../../services/EmployeeKppsService";
export default function AssignEmployeeKppComponent() {
   
    const navigate = useNavigate();
    const [kpps, setKpps] = useState([])
    
   
    useEffect(() => {
        KeyParameterService.getKPPDetailsForAssignKppByPaging().then((res) => {
            setKpps(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
        });
    }, []);
   
    const removeCookies = () => {
        Cookies.remove('empIdForKpp');
        Cookies.remove('empEIdForKpp');
        Cookies.remove('empKppRoleId');
        Cookies.remove('empKppDeptId');
        Cookies.remove('empKppDesigId');
        Cookies.remove('empReportingIdForKpp');

        navigate(`/showEmployeeForKpp`, { replace: true })
      }


      const saveKPPDetailsForEmployee = (e,newKppId) => {
        e.preventDefault()
        let statusCd = 'A';
        let kppId =newKppId;
       let empId = Cookies.get('empIdForKpp');
       let empEId = Cookies.get('empEIdForKpp');

       let roleId = Cookies.get('empKppRoleId');
       let deptId = Cookies.get('empKppDeptId');
       let desigId = Cookies.get('empKppDesigId');
       let reportingEmpId =Cookies.get('empReportingIdForKpp');
       let employeeId = Cookies.get('empId');
       let kpp = { kppId,empId,empEId,roleId, deptId,desigId,reportingEmpId, statusCd,employeeId};
       console.log(kpp)

        EmployeeKppsService.assignEmployeeKppDetails(kpp).then(res => {
            KeyParameterService.getKPPDetailsForAssignKppByPaging().then((res) => {
                setKpps(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
            });
            console.log("res=", res.data)
          
            alert("Employee Kpp added");
        }
        );
        // window.location.reload(); 
    }



        /*KeyParameterService.saveKPPDetails(kpp).then(res => {
            KeyParameterService.getKPPDetailsByPaging().then((res) => {
                setKpps(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
            });
            console.log("Kpp added");
        }
        );*/
        // window.location.reload(); 
    

    return (
        <div className="row">
        <div><button type="submit" className="btn btn-info col-sm-offset-1 "  onClick={() => removeCookies()}> Back</button> <h2 className="text-center">Key Parameter List</h2></div>
        
        
       
        <div className="col-md-10">
            <div className="row">
           
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Action</th>
                            <th>KPP Objective</th>
                            <th>Performance Indicator</th>

                            <th>Overall Target</th>
                            <th>Target Period</th>
                            <th>UOM</th>
                            <th>Overall Weightage</th>
                            <th>Rating 1</th>
                            <th>Rating 2</th>
                            <th>Rating 3</th>
                            <th>Rating 4</th>
                            <th>Rating 5</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {
                                    kpps.map(
                                        (kpp, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={kpp.kppId}>
                                                <td  className="text-center">{index + 1}</td>
                                                <td className="text-center"> <button type="submit" className="btn btn-info"  onClick={(e) => saveKPPDetailsForEmployee(e, kpp.kppId)}>Assign</button></td>
                                                <td className="text-justify">{kpp.kppObjective}</td>
                                                <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                                <td className="text-justify">{kpp.kppOverallTarget}</td>
                                                <td className="text-justify">{kpp.kppTargetPeriod}</td>
                                                <td className="text-justify">{kpp.kppUoM}</td>
                                                <td className="text-justify">{kpp.kppOverallWeightage}</td>
                                                <td className="text-justify">{kpp.kppRating1}</td>
                                                <td className="text-justify">{kpp.kppRating2}</td>
                                                <td className="text-justify">{kpp.kppRating3}</td>
                                                <td className="text-justify">{kpp.kppRating4}</td>
                                                <td className="text-justify">{kpp.kppRating5}</td>
                                            </tr>
                                    )
                                } 
                    </tbody>
                </table>
             
            </div>
            
        </div>
      
    </div>
    );}