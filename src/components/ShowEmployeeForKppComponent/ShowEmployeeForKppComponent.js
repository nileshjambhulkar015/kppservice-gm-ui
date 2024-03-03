import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
export default function ShowEmployeeForKppComponent() {

    const navigate = useNavigate(); 

    //const [reportingRoles, setReportingRoles] = useState([])
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');

    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [roles, setRoles] = useState([])
    
  //  const [reportingDepartments, setReportingDepartments] = useState([])

 //   const [reportingDesignations, setReportingDesignations] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        //reprting to employee role
       /* RoleService.getRolesInDesignation().then((res) => {

            setReportingRoles(res.data?.filter((item) => item.roleId !== 3 && item.roleId !== 4));
        });*/

        EmployeeService.getEmployeeDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content);
        });

        RoleService.getRolesInDesignation().then((res) => {
            setRoles(res.data);
            console.log("res.data?.[0].roleId = ",res.data?.[0].roleId)
            setRoleId(res.data?.[0].roleId)
           let roleId = res.data?.[0].roleId;
            DepartmentService.getDepartmentByRoleIdFromDesign(roleId).then((res1) => {
                setDepartments(res1.data);
                setDeptId(res1.data?.[0].deptId)
                let deptId = res1.data?.[0].deptId;
                 DesignationService.getDesignationDetailsForKpp({ roleId, deptId }).then((res2) => {
                    setDesignations(res2.data);
                    setDesigId(res2.data?.[0]?.desigId)
                   
                });
            });
        });

    }, []);

    const handleRoleIdChange=(value)=>{
        setRoleId(value)
        let roleId = value;
         DepartmentService.getDepartmentByRoleIdFromDesign(value).then((res1) => {
            setDepartments(res1.data);
            setDeptId(res1.data?.[0].deptId)
            let deptId = res1.data?.[0].deptId;
             DesignationService.getDesignationDetailsForKpp({ roleId, deptId }).then((res2) => {
                setDesignations(res2.data);
                setDesigId(res2.data?.[0]?.desigId)

                let reportingEmpDesigId = res2.data?.[0]?.desigId
                EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                    setEmployees(res.data.responseData.content);           
                });
            });
    });}

    const handleDesigIdChange=(value)=>{
        setDesigId(value)
        
        let reportingEmpDesigId =value
            EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                setEmployees(res.data.responseData.content);           
            });
    }

    const handleDeptIdChange=(value)=>{
        console.log("Dept id =", value)
        setDeptId(value)
        let deptId = value;
        DesignationService.getDesignationDetailsForKpp({ roleId, deptId }).then((res2) => {
            setDesignations(res2.data);
            setDesigId(res2.data?.[0]?.desigId)

            let reportingEmpDesigId = res2.data?.[0]?.desigId
            EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                setEmployees(res.data.responseData.content);           
            });
        });
       
    }


    //for all department by role id for reporting to tab
  /* useEffect((e) => {
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
        }, [reportingEmpDesigId]);*/

        const navigateToAssignEmployee = (empId,empEId,roleId, deptId,desigId,reportingEmpId) => {
            console.log("reportingEmpId : ",reportingEmpId)
            Cookies.set('empIdForKpp', empId);
             Cookies.set('empEIdForKpp', empEId);            
        Cookies.set('empKppRoleId', roleId);
        Cookies.set('empKppDeptId', deptId);
        Cookies.set('empKppDesigId', desigId);
        Cookies.set('empReportingIdForKpp', reportingEmpId);
        navigate(`/assignEmployeeKpp`, { replace: true });
        }

       
    
    return (
        <div className="row">
            <h3 className="text-center">Assign KPP to  New Employee</h3>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="deptId">Select Role Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="roleId" onChange={(e) => handleRoleIdChange(e.target.value)}>
                             
                                {
                                    roles.map(
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
                            <select className="form-control" id="deptId" onChange={(e) => handleDeptIdChange(e.target.value)}>
                              
                                {
                                    departments.map(
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
                            <select className="form-control" id="desigId" onChange={(e) => handleDesigIdChange(e.target.value)}>
                             
                                {
                                    designations.map(
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
                                      
                                        <td className="text-center"> <button type="submit" className="btn btn-info" onClick={() => 
                                            navigateToAssignEmployee(employee.empId,employee.empEId, employee.roleId,employee.deptId,employee.desigId,employee.reportingEmpId)
                                       }>Assign</button></td>
                                       </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
           

        </div>
    );
}