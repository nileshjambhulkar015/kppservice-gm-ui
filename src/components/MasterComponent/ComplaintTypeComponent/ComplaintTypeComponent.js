import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import ComplaintTypeService from "../../../services/ComplaintTypeService";
import { BASE_URL_API } from '../../../services/URLConstants';
import DesignationService from '../../../services/DesignationService';
import AlertboxComponent from '../../AlertboxComponent/AlertboxComponent';
export default function ComplaintTypeComponent() {


    const [compTypeId, setCompTypeId] = useState('');
    const [compTypeName, setCompTypeName] = useState('');
    const [remark, setRemark] = useState('');

    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');

    const [departments, setDepartments] = useState([])

  

    const [complaintTypes, setComplaintTypes] = useState([]);

    const [compDepartments, setCompDepartments] = useState([])
    const [compDeptId, setCompDeptId] = useState('');
    const [compDeptName, setCompDeptName] = useState('');

    const [saveComplaintTypeAlert, setSaveComplaintTypeAlert] = useState(false);
    const [deleteComplaintTypeAlert, setDeleteComplaintTypeAlert] = useState(false);
    const [updatComplaintTypeAlert, setUpdateComplaintTypeAlert] = useState(false);

    const handleClose = () => {

        setSaveComplaintTypeAlert(false);
        setDeleteComplaintTypeAlert(false)
        setUpdateComplaintTypeAlert(false)
        setCompTypeName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        ComplaintTypeService.getComplaintTypeDetailsByPaging().then((res) => {
            setComplaintTypes(res.data.responseData.content);
        });

        // for employee except GM Role
        ComplaintTypeService.getAllComplaintTypeDepartments().then((res) => {
            setCompDepartments(res.data);
            setCompDeptId(res.data?.[0].deptId)
        });

        DesignationService.getAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
        });
 
    }, []);


    const handleCompDepartmentChange = (value) => {
        if (value == "Select Department Name") {
            value = null;
           
            ComplaintTypeService.getComplaintTypeDetailsByPaging().then((res) => {
                setComplaintTypes(res.data.responseData.content);
            });
    
        }
        setCompDeptId(value)

        let deptId = value;
        console.log("deptId : ",deptId)
       
        ComplaintTypeService.getComplaintTypeDetailsByDeptId(deptId).then((res) => {
                setComplaintTypes(res.data.responseData.content);          
        });       
    }
  
    const saveComplaintType = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let complaintType = { deptId, compTypeName, remark, statusCd, employeeId };

        ComplaintTypeService.saveComplaintTypeDetails(complaintType).then(res => {

            ComplaintTypeService.getComplaintTypeDetailsByPaging().then((res) => {
                setComplaintTypes(res.data.responseData.content);
                setCompTypeName('');
                setRemark('');

            });
        }
        );
        setSaveComplaintTypeAlert(false)
    }

    const showComplaintTypeById = (e) => {

        ComplaintTypeService.getComplaintTypeById(e).then(res => {
            let compType = res.data;
            setCompTypeId(compType.compTypeId)
            setCompTypeName(compType.compTypeName)
            setDeptName(compType.deptName)
            setRemark(compType.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteComplaintTypeById = (e) => {
        if (window.confirm("Do you want to delete this Complaint Type ?")) {
            ComplaintTypeService.getComplaintTypeById(e).then(res => {
                let complaintType = res.data;

                let compTypeId = complaintType.compTypeId;
                let compTypeName = complaintType.compTypeName;
                let remark = complaintType.remark;
                let statusCd = 'I';
                let updateComplaintType = { compTypeId, compTypeName, remark, statusCd };

                ComplaintTypeService.updateComplaintTypeDetails(updateComplaintType).then(res => {
                    ComplaintTypeService.getComplaintTypeDetailsByPaging().then((res) => {
                        setComplaintTypes(res.data.responseData.content);
                        console.log(res.data.responseData.content)
                    });
                    console.log("Complaint Type deleted");
                }
                );
            }
            );

        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
        deleteComplaintTypeAlert(false)
    }

    const updateComplaintType = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let complaintType = { compTypeId, compTypeName, remark, statusCd };

        ComplaintTypeService.updateComplaintTypeDetails(complaintType).then(res => {
            ComplaintTypeService.getComplaintTypeDetailsByPaging().then((res) => {
                setComplaintTypes(res.data.responseData.content);

            });
           
        }
        );
updatComplaintTypeAlert(false)
    }

    
    const handleDepartmentChange = (value) => {
        if (value == "Select Department") {
            value = null;
        }
        setDeptId(value)
    }

    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <h2 className="text-center">Complaint Type List</h2>
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-sm-5">
                            <label className="control-label col-sm-5" htmlFor="deptNameSearch"> Select Department Name:</label>
                            <div className="col-sm-6">
                            <select className="form-control" id="empTypeId" onChange={(e) => handleCompDepartmentChange(e.target.value)}>
                            <option>Select Department Name</option>
                        {
                            compDepartments.map(
                                compDepartment =>
                                    <option key={compDepartment.deptId} value={compDepartment.deptId}>{compDepartment.deptName}</option>
                            )
                        };

                    </select>
                               
                            </div>
                            </div>
                            <div className="col-sm-6" align="right">
                                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveComplaintType">Add Complaint Type</button>

                            </div>
                        </div>
                        <div className="row">

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Department Name</th>
                                        <th className="text-center">Complaint Type Name</th>

                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        complaintTypes.map(
                                            (complaintType, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={complaintType.compTypeId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{complaintType.deptName}</td>
                                                    <td>{complaintType.compTypeName}</td>


                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showComplaintTypeById(complaintType.compTypeId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteComplaintTypeById(complaintType.compTypeId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showComplaintTypeById(complaintType.compTypeId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="col-md-2"></div>

                </div>


                {/* Modal for save Complaint Type details */}
                <div className="modal fade" id="saveComplaintType" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Complaint Type</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">

                                    <div> <input type="hidden" id="compTypeId" name="compTypeId" value={compTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-5" htmlFor="compTypeName">Select Department:</label>
                                        <div className="col-sm-7">
                                            <select className="form-control" id="compTypeId" defaultValue={compTypeId} onChange={(e) => handleDepartmentChange(e.target.value)}>
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

                                    <div className="form-group">
                                        <label className="control-label col-sm-5" htmlFor="compTypeName">Complaint Type Name:</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" id="compTypeName" placeholder="Enter Complaint Type Name here" value={compTypeName} onChange={(e) => setCompTypeName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-5" htmlFor="reamrk">Enter Remark:</label>
                                        <div className="col-sm-7">
                                            <textarea row="15" cols="150" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveComplaintTypeAlert(true)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for update user details */}
                <div className="modal fade" id="updateDepartment" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Update Department</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div> <input type="hidden" id="compTypeId" name="compTypeId" value={compTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="compTypeName">Enter Complaint Type Name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="compTypeName" placeholder="Enter Complaint Type Name here" value={compTypeName} onChange={(e) => setCompTypeName(e.target.value)} />
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
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateComplaintType(e)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Modal for show data when user click on view button */}
                <div className="modal fade" id="showData" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Complaint Type Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div> <input type="hidden" id="compTypeId" name="compTypeId" value={compTypeId} /></div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="compTypeName" >Department Name:</label>
                                        <div className="col-sm-8">
                                            {deptName}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="compTypeName" >Complaint Type Name:</label>
                                        <div className="col-sm-8">
                                            {compTypeName}
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
            {saveComplaintTypeAlert && (
                <AlertboxComponent
                    show={saveComplaintTypeAlert}
                    title="danger"
                    message="Do you want to save Complaint Type"
                    onOk={saveComplaintType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updatComplaintTypeAlert && (
                <AlertboxComponent
                    show={updatComplaintTypeAlert}
                    title="danger"
                    message="Do you want to update Complaint Type"
                    onOk={saveComplaintType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {deleteComplaintTypeAlert && (
                <AlertboxComponent
                    show={deleteComplaintTypeAlert}
                    title="danger"
                    message="Do you want to delete Complaint Type"
                    onOk={saveComplaintType}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );

}