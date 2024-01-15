import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AddNewEmployeeComponent() {

    const navigate = useNavigate();

    const [empEId, setEmpEId] = useState('');
    const [roleId, setRoleId] = useState('');

    const [deptId, setDeptId] = useState('');

    const [desigId, setDesigId] = useState('');

    const [reportingEmpRoleId, setReportingEmpRoleId] = useState('');
    const [reportingEmpDeptId, setReportingEmpDeptId] = useState('');
    const [reportingEmpDesigId, setReportingEmpDesigId] = useState('');
    const [reportingEmpId, setReportingEmpId] = useState('');
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [empFirstName, setEmpFirstName] = useState('');
    const [empMiddleName, setEmpMiddleName] = useState('');
    const [empLastName, setEmpLastName] = useState('');
    const [empDob, setEmpDob] = useState('');
    const [empPhoto, setEmpPhoto] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');
    const [empEmerMobileNo, setEmpEmerMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [empGender, setEmpGender] = useState('Male');
    const [empBloodgroup, setEmpBloodgroup] = useState('A+');
    const [remark, setRemark] = useState('');


    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])
    const [reportingRoles, setReportingRoles] = useState([])
    const [departments, setDepartments] = useState([])
    const [reportingDepartments, setReportingDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [reportingDesignations, setReportingDesignations] = useState([])
    const [reportingEmpName, setReportingEmpName] = useState([])

    const [empFirstNameSearch, setEmpFirstNameSearch] = useState('');

    //for gender selection
    const onGenderChangeHandler = (event) => {
        setEmpGender(event);
    };

    //for blood group selection
    const onBloodGroupChangeHandler = (event) => {
        setEmpBloodgroup(event);
    };

    const saveEmployeeDetails = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let regionId = '1';
        let siteId = '1';
        let createdUserId = Cookies.get('empEId');
        console.log("login user id : ", createdUserId)
        let employee = { empEId, roleId, deptId, desigId, reportingEmpId, regionId, siteId, empFirstName, empMiddleName, empLastName, empDob, empMobileNo, empEmerMobileNo, empPhoto, emailId, tempAddress, permAddress, empGender, empBloodgroup, remark, statusCd, createdUserId };
        console.log(employee)

        EmployeeService.saveEmployeeDetails(employee).then(res => {
           alert("Added New Employee Information");
           navigate(`/employee`, { replace: true });
          
        }
        ).catch((err) => {
            alert(err.response.data.details)
        });
        // window.location.reload(); 
    }

    useEffect(() => {


        EmployeeService.getEmployeeDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content?.filter((item) => item.roleId !== 3 && item.roleId !== 4));
        });

        RoleService.getRolesInDesignation().then((res) => {
            setRoles(res.data?.filter((item) => item.roleId !== 3 && item.roleId !== 4));
        });

        //reprting to employee role
        RoleService.getRolesInDesignation().then((res) => {

            setReportingRoles(res.data?.filter((item) => item.roleId !== 1 && item.roleId !== 4));
        });

    }, []);

    const searchEmployeeFirstName = (e) => {
        EmployeeService.getEmployeeDetailsByEmpFirstNamePaging(e).then((res) => {
            setEmployees(res.data.responseData.content?.filter((item) => item.roleId !== 3 && item.roleId !== 4));
            console.log(res.data)
        });
    }

    //for all department by role id
    useEffect((e) => {
        roleId && DepartmentService.getDepartmentByRoleIdFromDesign(roleId).then((res) => {
            setDepartments(res.data);
        });
    }, [roleId]);

    //for all department by role id for reporting to tab
    useEffect((e) => {
        reportingEmpRoleId && DepartmentService.getDepartmentByRoleIdFromDesign(reportingEmpRoleId).then((res) => {
            setReportingDepartments(res.data);
        });
    }, [reportingEmpRoleId]);

    //for all designation  by dept id
    useEffect((e) => {
        deptId && DesignationService.getDesignationDetailsForKpp(deptId).then((res) => {
            setDesignations(res.data);
        });
    }, [deptId]);

    //for all designation  by dept id for reporting to tab
    useEffect((e) => {
        reportingEmpDeptId && DesignationService.getDesignationDetailsForKpp(reportingEmpDeptId).then((res) => {
            setReportingDesignations(res.data);
        });
    }, [reportingEmpDeptId]);

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
                    <label className="control-label col-sm-2" htmlFor="roleId">Select Role Name:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="roleId" onChange={(e) => setRoleId(e.target.value)}>
                                <option>--Select Role--</option>
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
                    <label className="control-label col-sm-2" htmlFor="deptId">Select Department:</label>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <select className="form-control" id="deptId" onChange={(e) => setDeptId(e.target.value)}>
                                <option>--Select Department--</option>
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
                            <select className="form-control" id="desigId" onChange={(e) => setDesigId(e.target.value)}>
                                <option>--Select Designation--</option>
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
                        <label className="control-label col-sm-2" htmlFor="empFirstName">Employee Name:</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empFirstName" value={empFirstName} onChange={(e) => setEmpFirstName(e.target.value)} placeholder="Enter First Name here" />
                        </div>

                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empMiddleName" value={empMiddleName} onChange={(e) => setEmpMiddleName(e.target.value)} placeholder="Enter Middle Name here" />
                        </div>

                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empLastName" value={empLastName} onChange={(e) => setEmpLastName(e.target.value)} placeholder="Enter Last Name here" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2" htmlFor="empEId">Employee Id:</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empEId" value={empEId} onChange={(e) => setEmpEId(e.target.value)} placeholder="Enter Employee Id here" />
                        </div>

                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                        <div className="col-sm-2">
                            <input type="file" className="form-control" id="empPhoto" value={empPhoto} onChange={(e) => setEmpPhoto(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 " htmlFor="empMobileNo">Mobile No 1:</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empMobileNo" value={empMobileNo} onChange={(e) => setEmpMobileNo(e.target.value)} placeholder="Enter Mobile Number here" />
                        </div>

                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="empEmerMobileNo" value={empEmerMobileNo} onChange={(e) => setEmpEmerMobileNo(e.target.value)} placeholder="Enter Emergency Mobile Number  here" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2" htmlFor="tempAddress">Temporary Address:</label>
                        <div className="col-sm-2">
                            <textarea row="6" className="form-control" id="tempAddress" value={tempAddress} onChange={(e) => setTempAddress(e.target.value)} placeholder="Enter Temporary Address here" />
                        </div>

                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                        <div className="col-sm-2">
                            <textarea row="6" className="form-control" id="permAddress" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} placeholder="Enter Permenent Address here" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2" htmlFor="emailId"> Email Id:</label>
                        <div className="col-sm-2">

                            <input type="text" className="form-control" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Email Id here" />

                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2" htmlFor="empGender">Gender:</label>
                        <div className="col-sm-2">
                            <select className="form-control" id="empGender" onChange={(e) => onGenderChangeHandler(e.target.value)} defaultValue={empGender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>


                        <label className="control-label col-sm-2" htmlFor="empDob">Date Of Birth:</label>
                        <div className="col-sm-2">
                            <input type="date" className="form-control" id="empDob" value={empDob} onChange={(e) => setEmpDob(e.target.value)} />

                        </div>


                    </div>
                </div>


                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="deptId">Reporting Employee Details:</label>

                </div>


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
                        <label className="control-label col-sm-2" htmlFor="reamrk">Enter Remark:</label>
                        <div className="col-sm-3">
                            <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
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