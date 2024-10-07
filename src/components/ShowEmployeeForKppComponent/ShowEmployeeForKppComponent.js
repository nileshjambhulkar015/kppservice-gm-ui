import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import EmployeeService from "../../services/EmployeeService";
import RoleService from "../../services/RoleService";
import EmployeeDDService from '../../services/DropDownService/EmployeeDDService';
import EmployeeTypeService from '../../services/MasterService/EmployeeTypeService';
import RegionService from '../../services/RegionService';
import SiteService from '../../services/MasterService/SiteService';
import CompanyMasterService from '../../services/MasterService/CompanyMasterService';
import EmployeeKppsService from '../../services/EmployeeKppsService'
export default function ShowEmployeeForKppComponent() {

    const navigate = useNavigate();

    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companyName, setComapnyName] = useState('');

    const [compnays, setCompanys] = useState([])
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
    
    const[empFirstNameSearch, setEmpFirstNameSearch] = useState();
    const [isSuccess, setIsSuccess] = useState(true)
    const [empEIdSearch, setEmpEIdSearch] = useState('');
    const [empTypeId, setEmpTypeId] = useState('');
    const [empTypes, setEmpTypes] = useState([])
    useEffect(() => {

        EmployeeKppsService.getEmployeeKPPDetailsByPaging().then((res) => {
            setEmployees(res.data.responseData.content);
        });

        RoleService.getRoles().then((res) => {
            setRoles(res.data);
        });

        EmployeeTypeService.getDDEmployeeType().then((res) => {
            setEmpTypes(res.data.responseData);
        });

        DesignationService.getAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
        });

        RegionService.ddRegions().then((res) => {
            setRegions(res.data);
        });

        SiteService.getAllSites().then((res) => {
            setSites(res.data);
        });

        CompanyMasterService.getAllCompanyies().then((res) => {
            setCompanys(res.data);
        });
    }, []);


    const searchEmployeeEId = (e) => {
        setEmpEIdSearch(e.target.value)
    
        EmployeeKppsService.getEmployeeKPPDetailsByEmpFirstNamePaging(e.target.value).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setEmployees(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
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

        // Advance search employee
        const searchEmployeeDetails = (e) => {

            e.preventDefault()
            let advEmployeeSearch = { roleId, deptId, regionId,siteId,companyId,empTypeId };
          
            EmployeeService.advanceSearchEmployee(advEmployeeSearch).then(res => {
                setEmployees(res.data.responseData.content);
                console.log("Site added");
            }
            );
        }
       

  //Employee advance search

      //for role , department and designation
      const handleRoleIdChange = (value) => {
        if(value=="Select Role"){
            value=null;
        }
        setRoleId(value)
    }

  const handleEmployeeTypeChange = (value) => {
    if(value=="Select Employee Type"){
        value=null;
    }
    setEmpTypeId(value)
}

const handleDepartmentChange = (value) => {
    if(value=="Select Department"){
        value=null;
    }
    setDeptId(value)
}

//for role change
const onRegionChangeHandler = (value) => {
    if(value=="Select Region"){
        value=null;
    }
    setRegionId(value);
};

  //for site change
  const onSiteChangeHandler = (value) => {
    if(value=="Select Site"){
        value=null;
    }
    setSiteId(value);
};

     //for Company change
     const onCompanyChangeHandler = (value) => {
        if(value=="Select Company"){
            value=null;
        }
        setCompanyId(value);
    };


    return (
        
        <div className="row">
            <h3 className="text-center">Assign KPP to  New Employee</h3>
            
            <div className="col-md-11">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <form className="form-horizontal">
                                <label className="control-label col-sm-3" htmlFor="empEIdSearch">Enter Employee Id:</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="empEIdSearch" placeholder="Enter Employee Id" value={empEIdSearch} onChange={(e) => searchEmployeeEId(e)} />
                                </div>
                            </form>
                           
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <button type="button" className="btn btn-primary col-sm-offset-4" data-toggle="modal" data-target="#advanceSearchEmployee">Advance Search</button>
                    </div>
                </div>
                
            </div>
            <div className="col-md-1"></div>

            <div className="col-sm-10">
            {isSuccess?
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Sr No</th>
                            <th className="text-center">Employee Name</th>
                            <th className="text-center">Employee Id</th>
                            <th className="text-center">Role Name</th>
                            <th className="text-center">Department Name</th>
                            <th className="text-center">Designation Name</th>
                            <th className="text-center">Mobile No</th>
                            <th className="text-center">Overall Target</th>
                            <th className="text-center">Overall Weightage</th>
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
                                        <td className="text-center">{employee.roleName}</td>
                                        <td className="text-center">{employee.deptName}</td>
                                        <td className="text-center">{employee.desigName}</td>
                                        <td className="text-center">{employee.empMobileNo}</td>

                                        <td className="text-center">{employee.totalOverallTarget}</td>
                                        <td className="text-center">{employee.totalOverallWeightage}</td>

                                        <td className="text-center"> <button type="submit" className="btn btn-info" onClick={() =>
                                            navigateToAssignEmployee(employee.empId, employee.empEId, employee.roleId, employee.deptId, employee.desigId, employee.reportingEmpId)
                                        }>Assign</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>  :<h4>Employee Id is not available</h4>}
            </div>

            
            {/* Modal for Advance search for employee details */}
            <div className="modal fade" id="advanceSearchEmployee" role="dialog">
                <form className="form-horizontal"  encType="multipart/form-data">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Advance Search Employee</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Employee Type:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="empTypeId" defaultValue={null} onChange={(e) => handleEmployeeTypeChange(e.target.value)}>
                                                <option>Select Employee Type</option>
                                                
                                                    {
                                                     
                                                        empTypes.map(
                                                            empType =>
                                                                <option key={empType.empTypeId} value={empType.empTypeId}>{empType.empTypeName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Role :</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="roleId" defaultValue={null}  onChange={(e) => handleRoleIdChange(e.target.value)}>
                                                <option>Select Role</option>    
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

                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Department:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="deptId" defaultValue={null} onChange={(e) => handleDepartmentChange(e.target.value)}>
                                                <option>Select Department</option>
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


                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="regionName">Region:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <select className="form-control" id="regionId" defaultValue={null} onChange={(e) => onRegionChangeHandler(e.target.value)}>
                                                <option>Select Region</option>   
                                                {
                                                        regions.map(
                                                            region =>
                                                                <option key={region.regionId} value={region.regionId}>{region.regionName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>

                                        <label className="control-label col-sm-2" htmlFor="siteName">Site:</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                            <select className="form-control" id="regionId" defaultValue={null} onChange={(e) => onSiteChangeHandler(e.target.value)}>
                                            <option>Select Site</option>
                                            {
                                                sites.map(
                                                    site =>
                                                        <option key={site.siteId} value={site.siteId}>{site.siteName}</option>
                                                )
                                            };

                                        </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label className="control-label col-sm-3" htmlFor="companyName">Company Name:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                            <select className="form-control" id="companyId" defaultValue={null} onChange={(e) => onCompanyChangeHandler(e.target.value)}>
                                            <option>Select Company</option>
                                            {
                                                compnays.map(
                                                    company =>
                                                        <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
                                                )
                                            };

                                        </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="modal-footer">
                                
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => searchEmployeeDetails(e)}>Search</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
}