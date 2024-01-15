import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AssignEmployeeKppComponent() {

    const navigate = useNavigate();
    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
  
    const [roleId, setRoleId] = useState('');
   
    const [deptId, setDeptId] = useState('');
   
    const [desigId, setDesigId] = useState('');
   
   
    


   
    const [reportingRoles, setReportingRoles] = useState([])
   
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [reportingDesignations, setReportingDesignations] = useState([])
    const [reportingEmpName, setReportingEmpName] = useState([])

    

   
   

    useEffect(() => {
        //reprting to employee role
        RoleService.getRolesInDesignation().then((res) => {

            setRoleId(res.data?.filter((item) => item.roleId !== 1 && item.roleId !== 4));
        });

    }, []);

    

    //for all department by role id for reporting to tab
    useEffect((e) => {
        roleId && DepartmentService.getDepartmentByRoleIdFromDesign(roleId).then((res) => {
            setDepartments(res.data);
        });
    }, [roleId]);

    //for all designation  by dept id
    useEffect((e) => {
        deptId && DesignationService.getDesignationDetailsForKpp(deptId).then((res) => {
            setDesignations(res.data);
        });
    }, [deptId]);

   

    //for all reportingEmpId  by desig id
    useEffect((e) => {
        console.log("inside for employee : ", e)
        console.log("inside for employee reportingEmpDesigId : ", reportingEmpDesigId)
        reportingEmpDesigId && EmployeeService.getEmployeeSuggest(reportingEmpDesigId).then((res) => {
            console.log(res.data)
            setReportingEmpName(res.data);
        });
    }, [reportingEmpDesigId]);

    return (
        <div className="row">
            <h3 className="text-center">Add New Employee</h3>
            <form className="form-horizontal">

                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="deptId">Select Role Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="reportingEmpRoleId" onChange={(e) => setReportingEmpRoleId(e.target.value)}>
                                <option>--Select Role--</option>
                                {
                                    reportingRoles.map(
                                        role =>
                                            <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                                    )
                                };

                            </select>
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="deptId">Select Department Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="reportingEmpDeptId" onChange={(e) => setReportingEmpDeptId(e.target.value)}>
                                <option>--Select Department--</option>
                                {
                                    reportingDepartments.map(
                                        department =>
                                            <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                    )
                                };

                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="desigId">Select Employee Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="reportingEmpDesigId" onChange={(e) => setReportingEmpDesigId(e.target.value)}>
                                <option>--Select Designation--</option>
                                {
                                    reportingDesignations.map(
                                        designation =>
                                            <option key={designation.desigId} value={designation.desigId}>{designation.desigName}</option>
                                    )
                                };

                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="deptId">Enter Reporting Employee Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="reportingEmpId" onChange={(e) => setReportingEmpId(e.target.value)}>
                                <option>--Select Reporting Name--</option>
                                {
                                    reportingEmpName.map(
                                        reporting =>
                                            <option key={reporting.empId} value={reporting.empId}>{reporting.empFirstName + " " + reporting.empMiddleName + " " + reporting.empLastName}</option>
                                    )
                                };

                            </select>

                        </div>
                    </div>
                </div>

<div className="form-group">
<div className="row">
<button type="submit" className="btn btn-success col-sm-offset-6" onClick={(e) => saveEmployeeDetails(e)}> Submit</button>
<button type="submit" className="btn btn-info col-sm-offset-1"  onClick={() => navigate(`/employee`, { replace: true })} > Back</button>
</div>
</div>
            </form>
            
        </div>
    );
}