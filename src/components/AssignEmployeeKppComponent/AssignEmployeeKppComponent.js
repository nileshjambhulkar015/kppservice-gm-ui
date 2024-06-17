import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyParameterService from "../../services/KeyParameterService";
import Cookies from 'js-cookie';
import EmployeeKppsService from "../../services/EmployeeKppsService";
import EmployeeService from "../../services/EmployeeService";
export default function AssignEmployeeKppComponent() {

    const navigate = useNavigate();
  const[empKppOverallTargetCount,setEmpKppOverallTargetCount] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [kppIsSuccess, setKppIsSuccess] = useState(true)
    const [kpps, setKpps] = useState([])
    const [viewEmpKpps, setViewEmpKpps] = useState([])

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
  

    const [overallTarget, setOverallTarget] = useState(0);
    const [overallWeightage, setOverallWeightage] = useState(0);


 //for Overall Targate change
 const onOverallTargetChangeHandler = (value) => {
    setOverallTarget(value);
};

//For Overall weightage chage
const onOverallWeightageChangeHandler = (value) => {
    setOverallWeightage(value);
};


    useEffect(() => {
        KeyParameterService.getKPPDetailsForAssignKppByPaging().then((res) => {
            if (res.data.success) {
                setKppIsSuccess(true);
                setKpps(res.data.responseData.content);
            }
            else {             
                setKppIsSuccess(false);
             }
           
        });

        KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                setViewEmpKpps(res.data.responseData.kppResponses.content);
            }
            else {
             
                setIsSuccess(false);
            }

         
        });

       EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res)=>{
            setEmpId(res.data.empId)
            setEmpEId(res.data.empEId)
            setEmpName(res.data.empFirstName +' '+res.data.empMiddleName+' '+res.data.empLastName )
            setRoleName(res.data.roleName)
            setDeptName(res.data.deptName)
            setDesigName(res.data.desigName)
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



    const saveKPPDetailsForEmployee = (e, newKppId) => {
        e.preventDefault()
        let statusCd = 'A';
        let kppId = newKppId;
        let empId = Cookies.get('empIdForKpp');
        let empEId = Cookies.get('empEIdForKpp');

        let roleId = Cookies.get('empKppRoleId');
        let deptId = Cookies.get('empKppDeptId');
        let desigId = Cookies.get('empKppDesigId');
        let reportingEmpId = Cookies.get('empReportingIdForKpp');
        let employeeId = Cookies.get('empId');

        //TODO: read value from dynamic textbox
        let kppOverallTarget = overallTarget;
        let kppOverallWeightage = overallWeightage;
        let kpp = { kppId,kppOverallTarget,kppOverallWeightage, empId, empEId, roleId, deptId, desigId, reportingEmpId, statusCd, employeeId };
        console.log(kpp)

        EmployeeKppsService.assignEmployeeKppDetails(kpp).then(res => {
            KeyParameterService.getKPPDetailsForAssignKppByPaging().then((res) => {
                if (res.data.success) {
                    setKppIsSuccess(true);
                    setKpps(res.data.responseData.content);
                    setOverallTarget(0);
                    setOverallWeightage(0);
                }
                else {             
                    setKppIsSuccess(false);
                 }
                
            });

            KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {
               
                if (res.data.success) {
                    setIsSuccess(true);
                    setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                    setViewEmpKpps(res.data.responseData.kppResponses.content);
                }
                else {
                 
                    setIsSuccess(false);
                }
              
            });
            console.log("res=", res.data)

            alert("Employee Kpp added");
        }
        );
        // window.location.reload(); 
    }

    const deleteKPPDetailsForEmployee = (kppId) => {

        EmployeeKppsService.deleteEmployeeKppDetails(kppId).then(res => {
            KeyParameterService.getKPPDetailsForAssignKppByPaging().then((res) => {
                if (res.data.success) {
                    setKppIsSuccess(true);
                    setKpps(res.data.responseData.content);
                }
                else {             
                    setKppIsSuccess(false);
                 }
            });

            KeyParameterService.viewKPPDetailsForAssignKppByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setEmpKppOverallTargetCount(res.data.responseData.empKppOverallTargetCount)
                    setViewEmpKpps(res.data.responseData.kppResponses.content);
                }
                else {
                 
                    setIsSuccess(false);
                }
               
            });
          

            alert("Employee Kpp deleted");
        }
        );
        // window.location.reload(); 
    }


    return (
        <div className="row container-fluid">

            <div className="row">
                <div className="col-md-12">
                    <button type="submit" className="btn btn-success col-sm-offset-8 " onClick={() => removeCookies()}> Back</button>
                </div>
            </div>

            <div className="row" >
                <form className="form-horizontal">
                    <div className="col-md-10">

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Name :</label>
                            <div className="col-sm-5">
                                {empName}
                            </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-sm-2"  >Role :</label>
                        <div className="col-sm-5">
                            {roleName}
                        </div>
                    </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Department :</label>
                            <div className="col-sm-5">
                                {deptName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Designation:</label>
                            <div className="col-sm-5">
                                {desigName}
                            </div>
                        </div>
                      



                    </div>
                </form>
            </div>

            <div className="row">


                <div className="col-md-10">
                    <h4 className="text-center">Key Parameter List</h4>
                    {kppIsSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Action</th>
                                <th>Overall Target</th>
                                <th>Overall Weightage</th>
                                <th>KPP Objective No</th>
                                <th>KPP Objective</th>
                                <th>Performance Indicator</th>

                               
                                <th>Target Period</th>
                                <th>UOM</th>
                               
                                <th className="text-center">Rating 5</th>
                                <th className="text-center">Rating 4</th>
                                <th className="text-center">Rating 3</th>
                                <th className="text-center">Rating 2</th>
                                <th className="text-center">Rating 1</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                kpps.map(
                                    (kpp, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={kpp.kppId}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center"> <button type="submit" className="btn btn-info" onClick={(e) => saveKPPDetailsForEmployee(e, kpp.kppId)}>Assign</button></td>
                                            <td className="text-center">
                                            
                                            <input type="number" className="form-control" defaultValue={0}  onChange={(e)=>setOverallTarget(e.target.value)  }/>
                                            </td>
                                            <td className="text-center">
                                            <input type="number" className="form-control" defaultValue={0}  onChange={(e)=>setOverallWeightage(e.target.value)} />
                                            </td>
                                            <td className="text-justify">{kpp.kppObjectiveNo}</td>
                                            <td className="text-justify">{kpp.kppObjective}</td>
                                            <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                            <td className="text-center">{kpp.kppTargetPeriod}</td>
                                            
                                            <td className="text-center">{kpp.kppUoM}</td>
                                            
                                            <td className="text-center">{kpp.kppRating1}</td>
                                            <td className="text-center">{kpp.kppRating2}</td>
                                            <td className="text-center">{kpp.kppRating3}</td>
                                            <td className="text-center">{kpp.kppRating4}</td>
                                            <td className="text-center">{kpp.kppRating5}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    : <h3>All Kpp Set to Employee</h3>}
                </div>

            </div>


            <div className="col-md-10">
                <div className="row">

                    <h4>View Assign Employee KPP</h4>
                    {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Action</th>
                                <th>KPP Objective No</th>
                                <th>KPP Objective</th>
                                <th>Performance Indicator</th>

                                <th>Overall Target</th>
                                <th>Target Period</th>
                                <th>UOM</th>
                                <th>Overall Weightage</th>
                                <th className="text-center">Rating 5</th>
                                <th className="text-center">Rating 4</th>
                                <th className="text-center">Rating 3</th>
                                <th className="text-center">Rating 2</th>
                                <th className="text-center">Rating 1</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                viewEmpKpps.map(
                                    (kpp, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={kpp.kppId}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center"> <button type="submit" className="btn btn-info" onClick={(e) => deleteKPPDetailsForEmployee(kpp.kppId)}>Remove</button></td>
                                            <td className="text-justify">{kpp.kppObjectiveNo}</td>
                                            <td className="text-justify">{kpp.kppObjective}</td>
                                            <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                            <td className="text-center">{kpp.kppOverallTarget}</td>
                                            <td className="text-center">{kpp.kppTargetPeriod}</td>
                                            <td className="text-center">{kpp.kppUoM}</td>
                                            <td className="text-center">{kpp.kppOverallWeightage}</td>
                                            <td className="text-center">{kpp.kppRating1}</td>
                                            <td className="text-center">{kpp.kppRating2}</td>
                                            <td className="text-center">{kpp.kppRating3}</td>
                                            <td className="text-center">{kpp.kppRating4}</td>
                                            <td className="text-center">{kpp.kppRating5}</td>
                                        </tr>


                                )
                            }


                        </tbody>
                    </table>
                    : <h3>No KPP Set to Employee</h3>}
                    <h3>Total Kpp Target assign : {empKppOverallTargetCount}</h3>
                </div>

            </div>

        </div>
    );
}