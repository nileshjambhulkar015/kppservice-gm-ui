import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyParameterService from "../../services/KeyParameterService";
import Cookies from 'js-cookie';
import EmployeeKppsService from "../../services/EmployeeKppsService";
import EmployeeService from "../../services/EmployeeService";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import DepartmentService from "../../services/MasterService/DepartmentService";
import DesignationService from "../../services/MasterService/DesignationService";
import RoleService from "../../services/MasterService/RoleService";
export default function ChangeEmployeeDeptDesigComponent() {

    const navigate = useNavigate();

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [roles, setRoles] = useState([])

    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])

    
    const [reportingEmpRoleId, setReportingEmpRoleId] = useState('');
    const [reportingEmpDeptId, setReportingEmpDeptId] = useState('');
    const [reportingEmpDesigId, setReportingEmpDesigId] = useState('');
    const [reportingEmpId, setReportingEmpId] = useState('');
    const [reportingEmpEId, setReportingEmpEId] = useState('');
    const [reportingEmpName, setReportingEmpName] = useState('');

    const [gmEmpId, setGmEmpId] = useState('');
    const [gmEmpEId, setGmEmpEId] = useState('');
    const [gmEmpName, setGmEmpName] = useState('');


    const [reportingRoles, setReportingRoles] = useState([])
    const [reportingDepartments, setReportingDepartments] = useState([])
    const [reportingDesignations, setReportingDesignations] = useState([])
    const [reportingEmpNames, setReportingEmpNames] = useState([])
    useEffect(() => {

        EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res) => {
            setEmpId(res.data.empId)
            setEmpEId(res.data.empEId)
            setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
            setRoleName(res.data.roleName)
            setDeptName(res.data.deptName)
            setDesigName(res.data.desigName)
            setReportingEmpEId(res.data.reportingEmpEId)
            setReportingEmpName(res.data.reportingEmpName)

            setGmEmpEId(res.data.gmEmpEId)
            setGmEmpName(res.data.gmEmpName)
        });

        DepartmentService.ddAllDepartmentExceptGM().then((res1) => {
            setDepartments(res1.data);
            setDeptId(res1.data?.[0]?.deptId)
            let deptId = res1.data?.[0]?.deptId;
            DesignationService.ddDesignationDetailsForKpp(deptId).then((res2) => {
                setDesignations(res2.data);
                setDesigId(res2.data?.[0]?.desigId)

            });
        });

        // for employee except GM Role
        RoleService.ddRolesExceptGM().then((res) => {
            setRoles(res.data);
            setRoleId(res.data?.[0]?.roleId)
        });

        EmployeeService.ddRolesExceptEmployee().then((res) => {
            setReportingRoles(res.data);

            setReportingEmpRoleId(res.data?.[0]?.roleId)
            let roleId = res.data?.[0]?.roleId;
            EmployeeService.ddDepartmentFromEmployee(roleId).then((res1) => {
                setReportingDepartments(res1.data);
                setReportingEmpDeptId(res1.data?.[0]?.deptId)
                let deptId = res1.data?.[0]?.deptId;
                EmployeeService.ddDesignationFromEmployee({ roleId, deptId }).then((res2) => {
                    setReportingDesignations(res2.data);
                    setReportingEmpDesigId(res2.data?.[0]?.desigId)
                    let desigId = res2.data?.[0]?.desigId
                    EmployeeService.ddEmployeeName({ roleId, deptId, desigId }).then((res3) => {
                        setReportingEmpId(res3.data?.[0]?.empId)
                        setReportingEmpNames(res3.data);

                    });

                });
            });
        });

    }, []);



    const handleRoleIdChange = (value) => {
        setRoleId(value)
    }

    const handleDeptIdChange = (value) => {

        setDeptId(value)
        let deptId = value;
        DesignationService.ddDesignationDetailsForKpp(deptId).then((res2) => {
            setDesignations(res2.data);
            setDesigId(res2.data?.[0]?.desigId)

        });
    }

    const handleDesigIdChange = (value) => {
        setDesigId(value)
    }

    const updateEmployeeDeptOrDesignation = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')
        let employeeUpdateDeptDesigRequest = { empId, empEId, deptId, desigId, employeeId };

        if (window.confirm("Do you want to update Employee Department or Designation?")) {
            EmployeeService.updateEmployeeDeptOrDesignation(employeeUpdateDeptDesigRequest).then(res => {

                EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res) => {
                    setEmpId(res.data.empId)
                    setEmpEId(res.data.empEId)
                    setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
                    setRoleName(res.data.roleName)
                    setDeptName(res.data.deptName)
                    setDesigName(res.data.desigName)

                    setReportingEmpEId(res.data.reportingEmpEId)
                    setReportingEmpName(res.data.reportingEmpName)

                    setGmEmpEId(res.data.gmEmpEId)
                    setGmEmpName(res.data.gmEmpName)
                    navigate(`/changeemployeedeptdesig`, { replace: true })
                });


            }

            );
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }


    }

    const updateEmployeeRole = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')
        let updateEmployeeRole = { empId, empEId, roleId, employeeId };

        if (window.confirm("Do you want to update Employee Role?")) {
            EmployeeService.updateEmployeeRole(updateEmployeeRole).then(res => {

                EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res) => {
                    setEmpId(res.data.empId)
                    setEmpEId(res.data.empEId)
                    setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
                    setRoleName(res.data.roleName)
                    setDeptName(res.data.deptName)
                    setDesigName(res.data.desigName)
                    setReportingEmpEId(res.data.reportingEmpEId)
                    setReportingEmpName(res.data.reportingEmpName)
                    setGmEmpEId(res.data.gmEmpEId)
                    setGmEmpName(res.data.gmEmpName)
                    navigate(`/changeemployeedeptdesig`, { replace: true })
                });


            }

            );
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }


    }

    const updateEmployeeReportingName = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')
        let updateEmployeeReportingName = { empId, roleId,reportingEmpId, employeeId };

        if (window.confirm("Do you want to update Employee Reporting name?")) {
            EmployeeService.updateEmployeeReportingName(updateEmployeeReportingName).then(res => {

                EmployeeService.searchEmployeeById(Cookies.get('empIdForKpp')).then((res) => {
                    setEmpId(res.data.empId)
                    setEmpEId(res.data.empEId)
                    setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
                    setRoleName(res.data.roleName)
                    setDeptName(res.data.deptName)
                    setDesigName(res.data.desigName)
                    setReportingEmpEId(res.data.reportingEmpEId)
                    setReportingEmpName(res.data.reportingEmpName)
                    setGmEmpEId(res.data.gmEmpEId)
                    setGmEmpName(res.data.gmEmpName)
                    navigate(`/changeemployeedeptdesig`, { replace: true })
                });


            }

            );
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }


    }

     const handleReportingRoleIdChange = (value) => {
            setReportingEmpRoleId(value)
            let roleId = value
            EmployeeService.ddDepartmentFromEmployee(roleId).then((res1) => {
                setReportingDepartments(res1.data);
                setReportingEmpDeptId(res1.data?.[0].deptId)
                let deptId = res1.data?.[0]?.deptId;
                EmployeeService.ddDesignationFromEmployee({ roleId, deptId }).then((res2) => {
                    setReportingDesignations(res2.data);
                    setReportingEmpDesigId(res2.data?.[0]?.desigId)
                    let desigId = res2.data?.[0]?.desigId
                    EmployeeService.ddEmployeeName({ roleId, deptId, desigId }).then((res3) => {
                        setReportingEmpId(res3.data?.[0]?.empId)
                        setReportingEmpNames(res3.data);
    
                    });
                });
            });
        }
    
        const handleReportingDesigIdChange = (value) => {
            setReportingEmpDesigId(value)
            let desigId = value
            EmployeeService.ddEmployeeName({ roleId, deptId, desigId }).then((res3) => {
                setReportingEmpId(res3.data?.[0]?.empId)
                setReportingEmpNames(res3.data);
    
            });
        }
    
        const handleReportingDeptIdChange = (value) => {
    
            setReportingEmpDeptId(value)
            let deptId = value;
            EmployeeService.ddDesignationFromEmployee({ roleId, deptId }).then((res2) => {
                setReportingDesignations(res2.data);
                setReportingEmpDesigId(res2.data?.[0]?.desigId)
                let desigId = res2.data?.[0]?.desigId
                EmployeeService.ddEmployeeName({ roleId, deptId, desigId }).then((res3) => {
                    setReportingEmpId(res3.data?.[0]?.empId)
                    setReportingEmpNames(res3.data);
    
                });
    
            });
    
        }
    
        const handleReportingEmpIdChange = (value) => {
            setReportingEmpId(value)
            //   setDesigId(value)
        }
    

    return (
        <div className="row container-fluid">

            <div className="row">
                <div className="col-md-12">

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
                            <label className="control-label col-sm-2"  >Employee Id :</label>
                            <div className="col-sm-5">
                                {empEId}
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

                        <div className="form-group">
                        <label className="control-label col-sm-2"  >Reporting Employee ID:</label>
                        <div className="col-sm-5">
                            {reportingEmpEId}
                        </div>
                    </div>

                    <div className="form-group">
                    <label className="control-label col-sm-2"  >Reporting Employee Name:</label>
                    <div className="col-sm-5">
                        {reportingEmpName}
                    </div>
                </div>

                <div className="form-group">
                <label className="control-label col-sm-2"  >Reporting General Manager ID:</label>
                <div className="col-sm-5">
                    {gmEmpEId}
                </div>
            </div>

            <div className="form-group">
            <label className="control-label col-sm-2"  >Reporting General Manager Name:</label>
            <div className="col-sm-5">
                {gmEmpName}
            </div>
        </div>
               

                        <hr></hr>
                        <div className="form-group">
                            <h3>Change Employee Department | Designation</h3>
                            <h4>*When reporting employee name change, then need to assign kpp again</h4>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="deptId">Select Department:</label>
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
                            <label className="control-label col-sm-2" htmlFor="desigId">Select Designation:</label>
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

                        <div className="form-group">
                            <div className="row">
                                <button type="submit" className="btn btn-success col-sm-offset-3" onClick={(e) => updateEmployeeDeptOrDesignation(e)}> Submit</button>
                                <button type="submit" className="btn btn-info col-sm-offset-1" onClick={() => navigate(`/changeemployeedeptdesig`, { replace: true })} > Back</button>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="form-group">
                            <h3>Change Employee Role</h3>
                            <h4>*When reporting employee name change, then need to assign kpp again</h4>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="roleId">Select Role Name:</label>
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
                            <div className="row">
                                <button type="submit" className="btn btn-success col-sm-offset-3" onClick={(e) => updateEmployeeRole(e)}> Change Role</button>
                                <button type="submit" className="btn btn-info col-sm-offset-1" onClick={() => navigate(`/changeemployeedeptdesig`, { replace: true })} > Back</button>
                            </div>
                        </div>
<hr></hr>

                        <div className="form-group">
                            <h3>Change Employee Reporting Name</h3>
                            <h4>*When reporting employee name change, then need to assign kpp again</h4>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="deptId">Select Role Name:</label>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <select className="form-control" id="reportingEmpRoleId" onChange={(e) => handleReportingRoleIdChange(e.target.value)}>
    
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
                                <select className="form-control" id="reportingEmpDeptId" onChange={(e) => handleReportingDeptIdChange(e.target.value)}>
    
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
                                <select className="form-control" id="reportingEmpDesigId" onChange={(e) => handleReportingDesigIdChange(e.target.value)}>
    
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
                                <select className="form-control" id="reportingEmpId" onChange={(e) => handleReportingEmpIdChange(e.target.value)}>
                                    {
                                        reportingEmpNames.map(
                                            reporting =>
                                                <option key={reporting.empId} value={reporting.empId}>{reporting.empName}</option>
                                        )
                                    };
    
                                </select>
    
                            </div>
                        </div>
                    </div>

                      <div className="form-group">
                            <div className="row">
                                <button type="submit" className="btn btn-success col-sm-offset-3" onClick={(e) => updateEmployeeReportingName(e)}> Change Reporting Name</button>
                                <button type="submit" className="btn btn-info col-sm-offset-1" onClick={() => navigate(`/changeemployeedeptdesig`, { replace: true })} > Back</button>
                            </div>
                        </div>
                    
                    </div>
                </form>
            </div>
        </div>
    );
}