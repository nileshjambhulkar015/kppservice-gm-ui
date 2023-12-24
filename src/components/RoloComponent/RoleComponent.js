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

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Role Name</th>
                                    <th className="text-center">Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map(
                                        (role, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={role.roleId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{role.roleName}</td>
                                                <td>{role.remark}</td>
                                                </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

        
        </div>
    );
}