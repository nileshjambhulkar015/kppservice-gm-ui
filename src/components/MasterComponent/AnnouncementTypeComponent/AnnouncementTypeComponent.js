
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import { BASE_URL_API } from '../../../services/URLConstants';
import AnnouncementTypeService from '../../../services/AnnouncementTypeService';
export default function AnnouncementComponent() {


    const [announTypeId, setAnnounTypeId] = useState('');
    const [announTypeName, setAnnounTypeName] = useState('');
    const [remark, setRemark] = useState('');

    const [deptNameSearch, setDeptNameSearch] = useState('');

    const [annonTypes, setAnnonTypes] = useState([])

    const updatedDept = ['Human Resource', 'General Manager'];
    const [roles, setRoles] = useState([])

    const [message, setMessage] = useState('');

    //loading all department and roles while page loading at first time
    useEffect(() => {
        AnnouncementTypeService.getAnnouncementTypeDetailsByPaging().then((res) => {
    
            setAnnonTypes(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });
    }, []);



    

    const saveAnnouncementType = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let department = { announTypeName, remark, statusCd, employeeId };

        AnnouncementTypeService.saveAnnouncementTypeDetails(department).then(res => {
            if (res.data.success) {
            AnnouncementTypeService.getAnnouncementTypeDetailsByPaging().then((res) => {
                setAnnonTypes(res.data.responseData.content);
                setAnnounTypeName('');
                setRemark('');

            });
        }
        else {
            alert(res.data.responseMessage)
        }
            
        }
        );
        // window.location.reload(); 
    }

    const showAnnouncementTypeById = (e) => {
       
        AnnouncementTypeService.getAnnouncementTypeById(e).then(res => {
           
            let announcementType = res.data;
            setAnnounTypeId(announcementType.announTypeId)
            setAnnounTypeName(announcementType.announTypeName)
            setRemark(announcementType.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteAnnouncementTypeById = (e) => {
        if (window.confirm("Do you want to delete this Announcement Type name ?")) {
            AnnouncementTypeService.getAnnouncementTypeById(e).then(res => {
                let announcementType = res.data;

                let annonTypeId = announcementType.annonTypeId;
                let annonTypeName = announcementType.annonTypeName;
                let remark = announcementType.remark;
                let statusCd = 'I';
                let updateAnnouncementType = { annonTypeId, annonTypeName, remark, statusCd };

                AnnouncementTypeService.updateAnnouncementType(updateAnnouncementType).then(res => {
                    AnnouncementTypeService.getAnnouncementTypeDetailsByPaging().then((res) => {
    
                        setAnnonTypes(res.data.responseData.content);
                        console.log(res.data.responseData.content)
                    });
                }
                );
            }
            );

        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
    }

    const updateAnnouncementType = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let department = { announTypeId, announTypeName, remark, statusCd };

        AnnouncementTypeService.updateDepartmentDetails(department).then(res => {
            AnnouncementTypeService.getDepartmentDetailsByPaging().then((res) => {
                setAnnonTypes(res.data.responseData.content);

            });
            console.log("Department added");
        }
        );

    }


    return (

        <div>
            <div className="row">
                <h2 className="text-center">Announcement Type List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-sm-5">
                            
                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveAnnouncementType">Add Announcement Type</button>
                            
                        </div>
                    </div>
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Announcement Type Name</th>

                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    annonTypes.map(
                                        (annonType, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={annonType.announTypeId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{annonType.announTypeName}</td>


                                                <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showAnnouncementTypeById(annonType.announTypeId) }>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteAnnouncementTypeById(annonType.announTypeId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showAnnouncementTypeById(annonType.announTypeId)} >View</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>




            {/* Modal for save department details */}
            <div className="modal fade" id="saveAnnouncementType" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Announcement Type</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div> <input type="hidden" id="annonTypeId" name="annonTypeId" value={announTypeId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="announTypeName">Enter Announcement Type Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="announTypeName" placeholder="Enter Announcement Type here" value={announTypeName} onChange={(e) => setAnnounTypeName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveAnnouncementType(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for update user details */}
            <div className="modal fade" id="updateAnnouncementType" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update Announcement Type</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="annonTypeId" name="annonTypeId" value={announTypeId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="announTypeName">Enter Announcement Type Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="announTypeName" placeholder="Enter Announcement Type Name here" value={announTypeName} onChange={(e) => setAnnounTypeName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateAnnouncementType(e)} > Submit</button>
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
                            <h4 className="modal-title">Announcement Type Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div> <input type="hidden" id="announTypeId" name="announTypeId" value={announTypeId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="annonTypeName" >Announcement Type Name:</label>
                                    <div className="col-sm-8">
                                        {announTypeName}
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