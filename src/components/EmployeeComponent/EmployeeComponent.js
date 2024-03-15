import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
export default function EmployeeComponent() {
    const navigate = useNavigate();
    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
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

    

    useEffect(() => {

       
        EmployeeService.getEmployeeDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content?.filter((item)=>item.roleId!==1));
        });

        RoleService.getRolesInDesignation().then((res) => {
            setRoles(res.data?.filter((item)=>item.roleId!==1));
        });

        //reprting to employee role
        RoleService.getRolesInDesignation().then((res) => {

            setReportingRoles(res.data?.filter((item)=>item.roleId!==1));
        });

    }, []);

    const searchEmployeeFirstName = (e) => {
        EmployeeService.getEmployeeDetailsByEmpFirstNamePaging(e).then((res) => {
            setEmployees(res.data.responseData.content?.filter((item)=>item.roleId!==1));
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

    const showEmployeeById = (e) => {

        EmployeeService.getEmployeeById(e).then(res => {
            let employee = res.data;
            console.log(employee)
            setEmpId(employee.empId)
            setEmpEId(employee.empEId)
            setRoleId(employee.roleId)
            setRoleName(employee.roleName)
            setDeptId(employee.deptId)
            setDeptName(employee.deptName)
            setDesigId(employee.desigId)
            setDesigName(employee.desigName)
            setReportingEmpId(employee.reportingEmpId)
            setRegionId(employee.regionId)
            setRegionName(employee.regionName)
            setSiteId(employee.siteId)
            setSiteName(employee.siteName)
            setEmpFirstName(employee.empFirstName)
            setEmpMiddleName(employee.empMiddleName)
            setEmpLastName(employee.empLastName)
            setEmpDob(employee.empDob)
            setEmpPhoto(employee.empPhoto)
            setEmpMobileNo(employee.empMobileNo)
            setEmpEmerMobileNo(employee.empEmerMobileNo)
            setEmailId(employee.emailId)
            setTempAddress(employee.tempAddress)
            setPermAddress(employee.permAddress)
            setEmpGender(employee.empGender)
            setEmpBloodgroup(employee.empBloodgroup)
            setRemark(employee.remark)
        }
        );
        // window.location.reload(); 
    }

    const deleteEmployeeById = (e) => {
        EmployeeService.getEmployeeById(e).then(res => {
            let employee = res.data;
            console.log(employee)
            setEmpEId(employee.empEId)
            setRoleId(employee.roleId)
            setEmpId(employee.empId)
            setDeptId(employee.deptId)
            setDeptName(employee.deptName)
            setDesigId(employee.desigId)
            setDesigName(employee.desigName)
            setReportingEmpId(employee.reportingEmpId)
            setRegionId(employee.regionId)
            setRegionName(employee.regionName)
            setSiteId(employee.siteId)
            setSiteName(employee.siteName)
            setEmpFirstName(employee.empFirstName)
            setEmpMiddleName(employee.empMiddleName)
            setEmpLastName(employee.empLastName)
            setEmpDob(employee.empDob)
            setEmpPhoto(employee.empPhoto)
            setEmpMobileNo(employee.empMobileNo)
            setEmpEmerMobileNo(employee.empEmerMobileNo)
            setEmailId(employee.emailId)
            setTempAddress(employee.tempAddress)
            setPermAddress(employee.permAddress)
            setEmpGender(employee.empGender)
            setEmpBloodgroup(employee.empBloodgroup)
            setRemark(employee.remark)
          
            let statusCd = 'I';

            let employeeData = { empId, empEId, roleId, deptId, desigId, reportingEmpId, regionId, siteId, empFirstName, empMiddleName, empLastName, empDob, empMobileNo, empEmerMobileNo, empPhoto, emailId, tempAddress, permAddress, empGender, empBloodgroup, remark, statusCd };
            EmployeeService.updateEmployeeDetails(employeeData).then(res => {
                EmployeeService.getEmployeeDetailsByPaging().then((res) => {
                    setEmployees(res.data.responseData.content);
                });
                console.log("Employee deleted");
            }
            );
        }
        );
    }

    const updateEmployeeDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let regionId = '1';
        let siteId = '1';
        let employeeData = { empId, empEId, roleId, deptId, desigId, reportingEmpId, regionId, siteId, empFirstName, empMiddleName, empLastName, empDob, empMobileNo, empEmerMobileNo, empPhoto, emailId, tempAddress, permAddress, empGender, empBloodgroup, remark, statusCd };

        EmployeeService.updateEmployeeDetails(employeeData).then(res => {
            EmployeeService.getEmployeeDetailsByPaging().then((res) => {
                setEmployees(res.data.responseData.content);
            });
            console.log("Employee deleted");
        }
        );
    }

     //upload excel data for department
     const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('http://localhost:9091/employee/upload-employee', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle response
                alert("Employee uploaded successfully")
            })
            .catch(error => {
                // Handle error
                alert('An error occurred while uploading the file.');
            });
    };

    return (


        <div className="row">
            <h2 className="text-center">Employee List</h2>
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <div className="row">
                    <div className="col-sm-6">      
                    <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-3" htmlFor="empFirstNameSearch">Enter First Name:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="empFirstNameSearch" placeholder="Enter First Name"  value={empFirstNameSearch} onChange={(e) => setEmpFirstNameSearch(e.target.value)}/>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-primary" onClick={() => searchEmployeeFirstName(empFirstNameSearch)}>Search</button>
                            </div>
                    </div>
                    <div className="col-sm-5">
                    <button type="button" className="btn btn-primary" onClick={() => navigate(`/newEmployee`, { replace: true })} >Add New Employee</button>
                    <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#uploadExcelEmployee">Upload Excel</button>
                    <button type="button" className="btn btn-primary col-sm-offset-1" >Advance Search</button>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th  className="text-center">Sr No</th>
                                <th className="text-center">Employee Name</th>
                                <th className="text-center">Employee Id</th>

                                <th className="text-center">Department Name</th>
                                <th className="text-center">Desig   nation Name</th>
                                <th className="text-center">Role Name</th>
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
                                            <td className="text-center">{employee.roleName}</td>
                                            <td className="text-center">{employee.empMobileNo}</td>
                                    
                                            <td className="col-sm-3 text-center"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateEmployee" onClick={() => showEmployeeById(employee.empId)}>Update</button>
                                                <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteEmployeeById(employee.empId)}>Delete</button>
                                                <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showEmployee" onClick={() => showEmployeeById(employee.empId)}>View</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="col-md-1"></div>

             {/* Modal for upload excel of employee details */}
             <div className="modal fade" id="uploadExcelEmployee" role="dialog">
             <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
                 <div className="modal-dialog">
                     <div className="modal-content">
                         <div className="modal-header">
                             <button type="button" className="close" data-dismiss="modal">&times;</button>
                             <h4 className="modal-title">Upload Employee</h4>
                         </div>
                         <div className="modal-body">
                             <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                             <div className="form-group">
                                 <label className="control-label col-sm-4" htmlFor="employee">Select file:</label>
                                 <div className="col-sm-8">
                                     <input type="file" id="file" name="file" />
                                 </div>
                             </div>


                         </div>
                         <div className="modal-footer">
                             <input type="submit" id="file" name="file" value={"Upload"} className="btn btn-primary" />
                             <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                         </div>
                     </div>

                 </div>
             </form>
         </div>

            {/* Update Employee Details */}


            <div className="modal fade" id="updateEmployee" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Employee</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" action="/action_page.php">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empFirstName" value={empFirstName} onChange={(e) => setEmpFirstName(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empMiddleName" value={empMiddleName} onChange={(e) => setEmpMiddleName(e.target.value)} placeholder="Enter Middle Name here" />
                                        </div>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empLastName" value={empLastName} onChange={(e) => setEmpLastName(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                                        <div className="col-sm-3">
                                            <input type="date" className="form-control" id="empDob" value={empDob} onChange={(e) => setEmpDob(e.target.value)} />

                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                                        <div className="col-sm-3">
                                            <input type="file" className="form-control" id="empPhoto" value={empPhoto} onChange={(e) => setEmpPhoto(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                                        <div className="col-sm-3">

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
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                                        <div className="col-sm-3">

                                            <select className="form-control" id="desigId" onChange={(e) => setDesigId(e.target.value)}>
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
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empMobileNo" value={empMobileNo} onChange={(e) => setEmpMobileNo(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" id="empEmerMobileNo" value={empEmerMobileNo} onChange={(e) => setEmpEmerMobileNo(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                                        <div className="col-sm-3">
                                            <textarea row="6" className="form-control" id="tempAddress" value={tempAddress} onChange={(e) => setTempAddress(e.target.value)} placeholder="Enter First Name here" />
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                                        <div className="col-sm-3">
                                            <textarea row="6" className="form-control" id="permAddress" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} placeholder="Enter Last Name here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                                        <div className="col-sm-4">

                                            <input type="text" className="form-control" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Email Id here" />

                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                                        <div className="col-sm-3">
                                            <select className="form-control" id="empGender" onChange={(e) => setEmpGender(e.target.value)} >
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                            </select>
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                                        <div className="col-sm-3">
                                            <select className="form-control" id="empBloodgroup" onChange={(e) => setEmpBloodgroup(e.target.value)}>
                                                <option value={"A+"}>A+ve</option>
                                                <option value={"B+"}>B+ve</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateEmployeeDetails(e)}> Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/** Display Employee by Id */}
            <div className="modal fade" id="showEmployee" role="dialog">
                <div className="modal-dialog modal-lg">


                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">View Employee Details</h4>
                        </div>

                        <div className="modal-body">
                            <form className="form-horizontal" action="/action_page.php">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Role Name:</label>
                                        <div className="col-sm-3">
                                            {roleName}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                                        <div className="col-sm-3">
                                            {deptName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                                        <div className="col-sm-3">
                                            {desigName}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                                        <div className="col-sm-9">
                                            {empFirstName + ' ' + empMiddleName + ' ' + empLastName}
                                        </div>


                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                                        <div className="col-sm-3">
                                            {empDob}

                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                                        <div className="col-sm-3">
                                            {empPhoto}
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                                        <div className="col-sm-3">
                                            {empMobileNo}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                                        <div className="col-sm-3">
                                            {empEmerMobileNo}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                                        <div className="col-sm-3">
                                            {tempAddress}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                                        <div className="col-sm-3">
                                            {permAddress}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                                        <div className="col-sm-4">
                                            {emailId}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                                        <div className="col-sm-3">
                                            {empGender}
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                                        <div className="col-sm-3">
                                            {empBloodgroup}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-8">
                                            {remark}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal"> Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}