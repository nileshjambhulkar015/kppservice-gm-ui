import React, { useEffect, useState } from "react";
import RoleService from "../../services/RoleService";

export default function RoleComponent() {
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [remark, setRemark] = useState('');

    const [roleNameSearch, setRoleNameSearch] = useState('');
    const [roles, setRoles] = useState([])

    useEffect(() => {
        RoleService.getRolesDetailsByPaging().then((res) => {
            setRoles(res.data.responseData.content);
        });
    }, []);

    const searchRoleName = (e) => {
        RoleService.getRolesDetailsByRoleNamePaging(e).then((res) => {
            setRoles(res.data.responseData.content);
        });
    }
    

    const saveRole = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let role = { roleName, remark, statusCd };

        RoleService.saveRolesDetails(role).then(res => {
            console.log("res=", res.data)
            RoleService.getRolesDetailsByPaging().then((res) => {
                setRoles(res.data.responseData.content);
                setRoleName('');
                setRemark('');
            });
        }
        );
        // window.location.reload(); 
    }

    const showRoleById = (e) => {

        RoleService.getRoleById(e).then(res => {
            let role = res.data;
            setRoleId(role.roleId)
            setRoleName(role.roleName)
            setRemark(role.remark)
        }
        );
    }


    const deleteRoleById = (e) => {
        RoleService.getRoleById(e).then(res => {
            let role = res.data;
            let roleId = role.roleId;
            let roleName = role.roleName;
            let remark = role.remark;
            let statusCd = 'I';
            let updateRole = { roleId, roleName, remark, statusCd };

            RoleService.updateRoleDetails(updateRole).then(res => {
                RoleService.getRolesDetailsByPaging().then((res) => {
                    setRoles(res.data.responseData.content);
                    console.log(res.data.responseData.content)
                });
            }
            );
        }
        );
    }

    const updateRole = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let role = { roleId, roleName, remark, statusCd };

        RoleService.updateRoleDetails(role).then(res => {
            RoleService.getRolesDetailsByPaging().then((res) => {
                setRoles(res.data.responseData.content);
            });
            console.log("Roles update");
        }
        );

    }
    return (

        <div>
            <div className="row">
                <h2 className="text-center">Role List</h2>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-3" htmlFor="roleNameSearch">Enter Role Name:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="roleNameSearch" placeholder="Enter Role Name"  value={roleNameSearch} onChange={(e) => setRoleNameSearch(e.target.value)}/>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-primary" onClick={() => searchRoleName(roleNameSearch)}>Search</button>
                            </div>
                        </div>
                        <div className="col-sm-4"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#saveRole">Add Role</button></div>
                    </div>

                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Role Name</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map(
                                        (role, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={role.roleId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{role.roleName}</td>
                                                <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateRole" onClick={() => showRoleById(role.roleId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteRoleById(role.roleId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showRoleById(role.roleId)}>View</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

            {/* Modal for save role details */}
            <div className="modal fade" id="saveRole" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Role</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="roleId" name="roleId" value={roleId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter Role Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="roleName" placeholder="Enter Role Name here" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                    <div className="col-sm-8">
                                        <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveRole(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for update Role details */}
            <div className="modal fade" id="updateRole" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update Role</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="roleId" name="roleId" value={roleId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="roleName">Enter Role Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="roleName" placeholder="Enter Role Name here" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                    <div className="col-sm-8">
                                        <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateRole(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>


            {/* Modal for show Role when user click on view button */}
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Role Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="roleId" name="roleId" value={roleId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="roleName" >Role Name:</label>
                                    <div className="col-sm-8">
                                        {roleName}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Remark :</label>
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
    );
}