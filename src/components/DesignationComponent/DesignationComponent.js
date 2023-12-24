import React from "react";
import DesignationService from "../../services/DesignationService";
import { useState } from "react";
import { useEffect } from "react";
import RoleService from "../../services/RoleService";
import DepartmentService from "../../services/DepartmentService";
export default function DesignationComponent() {
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');   
    const [desigName, setDesigName] = useState('');
    const [remark, setRemark] = useState('');

    const [desigNameSearch, setDesigNameSearch] = useState('');

    const [designations, setDesignations] = useState([])
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {
        DesignationService.getDesignationDetailsByPaging().then((res) => {
            setDesignations(res.data.responseData.content);
            console.log(res.data)
        });

        DepartmentService.getRolesInDept().then((res) => {
            setRoles(res.data);
        });      
    }, []);

    const searchDesigName = (e) => {
        DesignationService.getDesignationDetailsByDesigNamePaging(e).then((res) => {
            setDesignations(res.data.responseData.content);
            console.log(res.data)
        });
    }
    //for all department by role id
    useEffect((e)=>{
        roleId && DepartmentService.getDepartmentByRoleId(roleId).then((res) => {
            setDepartments( res.data);
         });
     },[roleId]);

    const saveDesignationDetails = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let designation = { roleId, deptId, desigName, remark, statusCd };

        DesignationService.saveDesignationDetails(designation).then(res => {
            DesignationService.getDesignationDetailsByPaging().then((res) => {
                setDesignations(res.data.responseData.content);
                console.log(res.data)
            });
            
        }
        );
        // window.location.reload(); 
    }

    
    const showDesignationById = (e) => {

        DesignationService.getDesignationById(e).then(res => {
            let designation = res.data;
            console.log(designation)
            setRoleId(designation.roleId)
            setRoleName(designation.roleName)
            setDesigId(designation.desigId)
            setDeptId(designation.deptId)
            setDeptName(designation.deptName)
            setDesigName(designation.desigName)
            setRemark(designation.remark)
          
        }
        );
        // window.location.reload(); 
    }

    const updateDesignationDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let updateDesignation = {desigId,roleId, deptId, desigName,remark, statusCd };
        
        DesignationService.updateDesignationDetails(updateDesignation).then(res => {
            DesignationService.getDesignationDetailsByPaging().then((res) => {
                setDesignations(res.data.responseData.content);
            });
           
        }
        );

    }

    const deleteDesignationById = (e) => {
       

        DesignationService.getDesignationById(e).then(res => {
            let designation = res.data;
            let desigId = designation.desigId;
            let roleId = designation.roleId;
           let deptId =designation.deptId;
          
           let desigName=designation.desigName;
            let remark =designation.remark;

            let statusCd = 'I';
            let deleteDesignation = {desigId,roleId, deptId,desigName, remark, statusCd };

           
            DesignationService.updateDesignationDetails(deleteDesignation).then(res => {
                DesignationService.getDesignationDetailsByPaging().then((res) => {
                    setDesignations(res.data.responseData.content);
                });
                console.log("designation deleted");
            }
            );
        }
        );
        // window.location.reload(); 
    }
    return (
       
        <div>
        <div className="row">
            <h2 className="text-center">Designation List</h2>
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-sm-8">
                    <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-4" htmlFor="desigNameSearch">Enter Designation Name:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="desigNameSearch" placeholder="Enter Designation Name"  value={desigNameSearch} onChange={(e) => setDesigNameSearch(e.target.value)}/>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-primary" onClick={() => searchDesigName(desigNameSearch)}>Search</button>
                            </div>
                    </div>
                    <div className="col-sm-4"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#saveDesignation">Add Designation</button></div>
                </div>
                <div className="row">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                              
                                <th>Department Name</th>
                                <th>Designation Name</th>
                                <th>Role Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    designations.map(
                                        (designation, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={designation.desigId}>
                                                <td>{index + 1}</td>
                                              
                                                <td>{designation.deptName}</td>
                                                <td>{designation.desigName}</td>
                                                <td>{designation.roleName}</td>
                                                <td className="col-sm-3"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDesignation" onClick={() => showDesignationById(designation.desigId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteDesignationById(designation.desigId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showDesignation" onClick={() => showDesignationById(designation.desigId)}>View</button></td>
                                            </tr>
                                    )
                                } 
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="col-md-2"></div>

        </div>
        {/**Save designation */}

        <div className="modal fade" id="saveDesignation" role="dialog">
            <div className="modal-dialog">


                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Add Designation</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal">
                        <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Select Role Name:</label>
                                <div className="col-sm-8">
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

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Select Department Name:</label>
                                <div className="col-sm-8">
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
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="desigName" value={desigName} onChange={(e) => setDesigName(e.target.value)} placeholder="Enter Designation Name here"  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                <div className="col-sm-8">
                                    <textarea row="5" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)}  placeholder="Enter Remark here" />
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveDesignationDetails(e)}> Submit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

{/**Update Designation */}

<div className="modal fade" id="updateDesignation" role="dialog">
            <div className="modal-dialog">


                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Update Designation</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal" >
                        <div> <input type="hidden" id="roleId" name="roleId" value={roleId} /></div>
                        <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="roleName">Role Name:</label>
                                <div className="col-sm-8">
                                {roleName}
                                </div>
                            </div>
                        <div> <input type="hidden" id="desigId" name="desigId" value={desigId} /></div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Department Name:</label>
                                <div className="col-sm-8">
                                {deptName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="desigName" value={desigName} onChange={(e) => setDesigName(e.target.value)} placeholder="Enter Designation Name here"  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                <div className="col-sm-8">
                                    <textarea row="5" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)}  placeholder="Enter Remark here" />
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateDesignationDetails(e)}> Submit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>


        {/**show designations */}

        <div className="modal fade" id="showDesignation" role="dialog">
            <div className="modal-dialog">


                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">View Designation</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal" action="/action_page.php">
                        <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="roleName">Role Name:</label>
                                <div className="col-sm-8">
                                {roleName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Department Name:</label>
                                <div className="col-sm-8">
                                {deptName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Designation Name:</label>
                                <div className="col-sm-8">
                                   {desigName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                <div className="col-sm-8">
                                    {remark}
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
       
        </div>
    
    );}