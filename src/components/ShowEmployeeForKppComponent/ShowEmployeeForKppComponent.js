import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
import EmployeeDDService from '../../services/DropDownService/EmployeeDDService';
export default function ShowEmployeeForKppComponent() {

    const navigate = useNavigate();

    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyName, setComapnyName] = useState('');


    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');

    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [roles, setRoles] = useState([])

    const [employees, setEmployees] = useState([])


    const [regions, setRegions] = useState([])
    const [sites, setSites] = useState([])
    const [companys, setCompanys] = useState([])

    useEffect(() => {

        EmployeeService.getEmployeeDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content);
        });

        ///
        EmployeeDDService.getRegionsFromEmployee().then((res) => {
            setRegions(res.data);
            console.log("res.data?.[0].roleId = ", res.data?.[0].roleId)
            setRegionId(res.data?.[0].regionId)
            let regionId = res.data?.[0].regionId;
            EmployeeDDService.getSitesByRegionIdFromEmployee(regionId).then((res1) => {
                setSites(res1.data);
                setSiteId(res1.data?.[0].siteId)
                let siteId = res1.data?.[0].siteId;
                EmployeeDDService.getCompanyFromEmployee({ regionId, siteId }).then((res2) => {
                    setCompanys(res2.data);
                    setCompanyId(res2.data?.[0]?.companyId)
                    let companyId = res2.data?.[0].companyId;
                    EmployeeDDService.getRolesFromEmployee({ regionId, siteId, companyId }).then((res3) => {
                        setRoles(res3.data);
                        setRoleId(res3.data?.[0]?.roleId)
                        let roleId = res3.data?.[0].roleId;
                        EmployeeDDService.getDeptFromEmployee({ regionId, siteId, companyId, roleId }).then((res4) => {
                            setDepartments(res4.data);
                            setDeptId(res4.data?.[0]?.deptId)

                            let deptId = res4.data?.[0].deptId;
                            EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
                                setDesignations(res5.data);
                                setDesigId(res5.data?.[0]?.desigId)

                                /*let reportingEmpDesigId = res5.data?.[0]?.desigId
                                EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                                    setEmployees(res.data.responseData.content);
                                });*/

                            });
                        });
                    });
                });
            });
        });
        ////
    }, []);


    // for region id, site id and company id
    const handleRegionIdChange = (value) => {
        setRegionId(value)
        let regionId = value;
        EmployeeDDService.getSitesByRegionIdFromEmployee(regionId).then((res1) => {
            setSites(res1.data);
            setSiteId(res1.data?.[0].siteId)
            let siteId = res1.data?.[0].siteId;
            EmployeeDDService.getCompanyFromEmployee({ regionId, siteId }).then((res2) => {
                setCompanys(res2.data);
                setCompanyId(res2.data?.[0]?.companyId)
                let companyId = res2.data?.[0].companyId;
                EmployeeDDService.getRolesFromEmployee({ regionId, siteId, companyId }).then((res3) => {
                    setRoles(res3.data);
                    setRoleId(res3.data?.[0]?.roleId)
                    let roleId = res3.data?.[0].roleId;
                    EmployeeDDService.getDeptFromEmployee({ regionId, siteId, companyId, roleId }).then((res4) => {
                        setDepartments(res4.data);
                        setDeptId(res4.data?.[0]?.deptId)

                        let deptId = res4.data?.[0].deptId;
                        EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
                            setDesignations(res5.data);
                            setDesigId(res5.data?.[0]?.desigId)
                            let reportingEmpDesigId = res5.data?.[0]?.desigId
                            EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res) => {
                                setEmployees(res.data.responseData.content);
                            });

                        });
                    });
                });
            });
        });
    }


    const handleCompanyIdChange = (value) => {
        setCompanyId(value)
        let companyId = value;
        EmployeeDDService.getRolesFromEmployee({ regionId, siteId, companyId }).then((res3) => {
            setRoles(res3.data);
            setRoleId(res3.data?.[0]?.roleId)
            let roleId = res3.data?.[0].roleId;
            EmployeeDDService.getDeptFromEmployee({ regionId, siteId, companyId, roleId }).then((res4) => {
                setDepartments(res4.data);
                setDeptId(res4.data?.[0]?.deptId)

                let deptId = res4.data?.[0].deptId;
                EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
                    setDesignations(res5.data);
                    setDesigId(res5.data?.[0]?.desigId)

                    let reportingEmpDesigId = res5.data?.[0]?.desigId
                    EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res6) => {
                        setEmployees(res6.data.responseData.content);
                    });

                });
            });
        });
    }

    const handleSiteIdChange = (value) => {
        setSiteId(value)
        let siteId = value;
        EmployeeDDService.getCompanyFromEmployee({ regionId, siteId }).then((res2) => {
            setCompanys(res2.data);
            setCompanyId(res2.data?.[0]?.companyId)
            let companyId = res2.data?.[0].companyId;
            EmployeeDDService.getRolesFromEmployee({ regionId, siteId, companyId }).then((res3) => {
                setRoles(res3.data);
                setRoleId(res3.data?.[0]?.roleId)
                let roleId = res3.data?.[0].roleId;
                EmployeeDDService.getDeptFromEmployee({ regionId, siteId, companyId, roleId }).then((res4) => {
                    setDepartments(res4.data);
                    setDeptId(res4.data?.[0]?.deptId)

                    let deptId = res4.data?.[0].deptId;
                    EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
                        setDesignations(res5.data);
                        setDesigId(res5.data?.[0]?.desigId)

                        let reportingEmpDesigId = res5.data?.[0]?.desigId
                        EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res6) => {
                            setEmployees(res6.data.responseData.content);
                        });

                    });
                });
            });
        });

    }


    // for role , dept and desig
    const handleRoleIdChange = (value) => {
        setRoleId(value)
        let roleId = value;
        EmployeeDDService.getDeptFromEmployee({ regionId, siteId, companyId, roleId }).then((res4) => {
            setDepartments(res4.data);
            setDeptId(res4.data?.[0]?.deptId)

            let deptId = res4.data?.[0].deptId;
            EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
                setDesignations(res5.data);
                setDesigId(res5.data?.[0]?.desigId)
                let reportingEmpDesigId = res5.data?.[0]?.desigId
                EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res6) => {
                    setEmployees(res6.data.responseData.content);
                });

            });
        });
    }

    const handleDesigIdChange = (value) => {
        setDesigId(value)

        let reportingEmpDesigId = value
        EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res6) => {
            setEmployees(res6.data.responseData.content);
        });
    }

    const handleDeptIdChange = (value) => {
        setDeptId(value)

        let deptId = value;
        EmployeeDDService.getDesigFromEmployee({ regionId, siteId, companyId, roleId, deptId }).then((res5) => {
            setDesignations(res5.data);
            setDesigId(res5.data?.[0]?.desigId)

            let reportingEmpDesigId = res5.data?.[0]?.desigId
            EmployeeService.getEmployeeDetailsByDesignationByPaging(reportingEmpDesigId).then((res6) => {
                setEmployees(res6.data.responseData.content);
            });

        });
    }


    const navigateToAssignEmployee = (empId, empEId, roleId, deptId, desigId, reportingEmpId) => {
        console.log("reportingEmpId : ", reportingEmpId)
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
                    <div className="row">
                        <label className="control-label col-sm-2" htmlFor="regionName">Region Name:</label>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <select className="form-control" id="regionId" onChange={(e) => handleRegionIdChange(e.target.value)}>

                                    {
                                        regions.map(
                                            region =>
                                                <option key={region.regionId} value={region.regionId}>{region.regionName}</option>
                                        )
                                    };

                                </select>
                            </div>
                        </div>

                        <label className="control-label col-sm-1" htmlFor="siteName">Site Name:</label>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <select className="form-control" id="siteId" onChange={(e) => handleSiteIdChange(e.target.value)}>

                                    {
                                        sites.map(
                                            site =>
                                                <option key={site.siteId} value={site.siteId}>{site.siteName}</option>
                                        )
                                    };

                                </select>
                            </div>
                        </div>

                        <label className="control-label col-sm-1" htmlFor="companyName">Company Name:</label>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <select className="form-control" id="roleId" onChange={(e) => handleCompanyIdChange(e.target.value)}>

                                    {
                                        companys.map(
                                            company =>
                                                <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                                        )
                                    };

                                </select>
                            </div>
                        </div>
                    </div>
                </div>





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
                            <th className="text-center">Sr No</th>
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
                                            navigateToAssignEmployee(employee.empId, employee.empEId, employee.roleId, employee.deptId, employee.desigId, employee.reportingEmpId)
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