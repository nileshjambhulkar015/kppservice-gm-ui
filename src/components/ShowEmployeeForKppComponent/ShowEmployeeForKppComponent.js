import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import { useNavigate, useParams } from 'react-router-dom';
export default function ShowEmployeeForKppComponent() {

    const navigate = useNavigate(); 

    const [reportingRoles, setReportingRoles] = useState([])

    const [reportingEmpRoleId, setReportingEmpRoleId] = useState('');
    const [reportingEmpDeptId, setReportingEmpDeptId] = useState('');
    const [reportingEmpDesigId, setReportingEmpDesigId] = useState('');
    
    const [reportingDepartments, setReportingDepartments] = useState([])

    const [reportingDesignations, setReportingDesignations] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        //reprting to employee role
        RoleService.getRolesInDesignation().then((res) => {

            setReportingRoles(res.data?.filter((item) => item.roleId !== 3 && item.roleId !== 4));
        });

        EmployeeService.getEmployeeDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
        });

    }, []);

    //for all department by role id for reporting to tab
    useEffect((e) => {
        reportingEmpRoleId && DepartmentService.getDepartmentByRoleIdFromDesign(reportingEmpRoleId).then((res) => {
            setReportingDepartments(res.data);
        });
    }, [reportingEmpRoleId]);



    //for all designation  by dept id for reporting to tab
    useEffect((e) => {
        reportingEmpDeptId && DesignationService.getDesignationDetailsForKpp(reportingEmpDeptId).then((res) => {
            setReportingDesignations(res.data);            
        });
    }, [reportingEmpDeptId]);

        //for employee details base on designation
        useEffect((e) => {
            reportingEmpDesigId && EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                setEmployees(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));           
            });
        }, [reportingEmpDesigId]);

    return (
        <div className="row">
            <h3 className="text-center">Assign KPP to  New Employee</h3>
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
                    <label className="control-label col-sm-2" htmlFor="desigId">Select Designation Name:</label>
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
                </form>
                <div className="col-sm-8">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th  className="text-center">Sr No</th>
                            <th className="text-center">Employee Name</th>
                            <th className="text-center">Employee Id</th>
                            <th className="text-center">Department Name</th>
                            <th className="text-center">Designation Name</th>                     
                            <th className="text-center">Mobile No</th>                            
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                (employee, index) =>   //index is inbuilt variable of map started with 0
                                    <tr key={employee.empId}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-justify">{employee.empFirstName + ' ' + employee.empMiddleName + ' ' + employee.empLastName}</td>
                                        <td className="text-center">{employee.empEId}</td>
                                        <td className="text-center">{employee.deptName}</td>
                                        <td className="text-center">{employee.desigName}</td>                                 
                                        <td className="text-center">{employee.empMobileNo}</td>
                                        <td className="text-center"> <button type="submit" className="btn btn-info" onClick={() => navigate(`/assignEmployeeKpp`, { replace: true })}>Assign</button></td>
                                       </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
           

        </div>
    );
}