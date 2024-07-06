import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";


import ComplaintService from '../../services/ComplaintService';

export default function ViewComplaintComponent() {


    const [compId, setCompId] = useState('');

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');

    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');

    const [compStatus, setCompStatus] = useState('Resolve');
    const [compDate, setCompDate] = useState('');
    const [compResolveDate, setCompResolveDate] = useState('');
    const [empCompId, setEmpCompId] = useState('');
    const [compDesc, setCompDesc] = useState('');
    const [compTypeId, setCompTypeId] = useState('');
    const [compTypeName, setCompTypeName] = useState('');
    const [remark, setRemark] = useState('');



    const [complaints, setComplaints] = useState([])

    const [complaintTypes, setComplaintTypes] = useState([])

    const [roles, setRoles] = useState([])

    const [message, setMessage] = useState('');

   
      //for gm approved or reject status selection
      const onComplaintStatusChangeHandler = (event) => {
        setCompStatus(event);
    };


    //loading all department and roles while page loading at first time
    useEffect(() => {
        ComplaintService.getResolveEmployeeCompaintsDetailsByPaging().then((res) => {
            setComplaints(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });

        ComplaintService.getAllComplaintType().then((res) => {
            setComplaintTypes(res.data);
            setCompTypeId(res.data?.[0].compTypeId)

        });
    }, []);


    const getComplaintById = (e) => {

        ComplaintService.getComplaintById(e).then(res => {
            let complaint = res.data;
            setEmpCompId(complaint.empCompId)
            setCompId(complaint.compId)
            setEmpId(complaint.empId)
            setEmpEId(complaint.empEId)


            setEmpName(complaint.empName)
            setEmpMobileNo(complaint.empMobileNo)
            setRoleId(complaint.roleId)
            setRoleName(complaint.roleName)
            setDeptId(complaint.deptId)
            setDeptName(complaint.deptName)
            setDesigId(complaint.desigId)
            setDesigName(complaint.desigName)


            setCompTypeId(complaint.compTypeId)
            setCompDate(complaint.compDate)
            setCompResolveDate(complaint.compResolveDate)
            setRemark(complaint.remark)
            setCompStatus(complaint.compStatus)
            setCompTypeName(complaint.compTypeName)
            setCompDesc(complaint.compDesc)
            
        }
        );
        // window.location.reload(); 
    }


    const deleteDepartmentById = (e) => {
        ComplaintService.deleteEmployeeComplaintById(empCompId).then(res => {
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);
                console.log(res.data.responseData.content)
            });
            console.log("Department deleted");
        }
        );
    }

    const updateComplaint = (e) => {

        e.preventDefault()

        let complaint = { empCompId,compStatus, remark };

        ComplaintService.updateComplaintDetails(complaint).then(res => {
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);

            });
            console.log("Complaint added");
        }
        );

    }
    
    return (

        <div className='container-fluid'>
            <div className="row">
                <h2 className="text-center">Resolve Complaint List</h2>

                <div className="col-md-12">
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Action</th>
                                    <th className="text-center">Complaint No</th>

                                    <th className="text-center">Employee Name</th>
                                    <th className="text-center">Employee ID</th>
                                    <th className="text-center">Role</th>
                                    <th className="text-center">Department</th>
                                    <th className="text-center">Designation</th>
                                     

                                    <th className="text-center">Complaint Date</th>
                                    <th className="text-center">Complaint Resolve Date</th>
                                    <th className="text-center">Complaint Type</th>
                                  

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    complaints.map(
                                        (complaint, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={complaint.empCompId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>

                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => getComplaintById(complaint.empCompId)}>View</button></td>

                                                <td>{complaint.compId}</td>


                                                <td>{complaint.empName}</td>
                                                <td>{complaint.empEId}</td>
                                                <td>{complaint.roleName}</td>
                                                <td>{complaint.deptName}</td>
                                                <td>{complaint.desigName}</td>


                                                <td>{complaint.compDate}</td>
                                                <td>{complaint.compResolveDate}</td>
                                                <td>{complaint.compTypeName}</td>
                                               


                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>




           

            {/* Modal for show data when user click on view button */}
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog modal-lg">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Complaint Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div> <input type="hidden" id="empCompId" name="deptId" value={empCompId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="compId" >Complaint Id:</label>
                                    <div className="col-sm-3">
                                        {compId}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Employee Name:</label>
                                    <div className="col-sm-8">
                                        {empName}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Mobile Number:</label>
                                    <div className="col-sm-3">
                                        {empMobileNo}
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Role Name:</label>
                                    <div className="col-sm-3">
                                        {roleName}
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Department Name:</label>
                                    <div className="col-sm-3">
                                        {deptName}
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Designation Name:</label>
                                    <div className="col-sm-8">
                                        {desigName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Type Name:</label>
                                    <div className="col-sm-8">
                                        {compTypeName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Start Date:</label>
                                    <div className="col-sm-8">
                                        {compDate}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Resolve Date:</label>
                                <div className="col-sm-8">
                                    {compResolveDate}
                                </div>
                            </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Complaint Description :</label>
                                    <div className="col-sm-8">
                                        {compDesc}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="hodKppStatus">Complaint Status:</label>
                                <div className="col-sm-3">
                                   {compStatus}
                                </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="remark">Remark :</label>
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