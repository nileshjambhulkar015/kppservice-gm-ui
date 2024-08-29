import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/DepartmentService";
import { BASE_URL_API } from '../../services/URLConstants';
import AnnouncementService from '../../services/AnnouncementService';
export default function AnnouncementComponent() {

    const [announId, setAnnounId] = useState('');
    const [announStartDate, setAnnounStartDate] = useState('');
    const [announEndDate, setAnnounEndDate] = useState('');
    const [announCreatedByEmpId, setAnnounCreatedByEmpId] = useState('');
    const [announCreatedByEmpEId, setAnnounCreatedByEmpEId] = useState('');
    const [announCreatedByEmpName, setAnnounCreatedByEmpName] = useState('');

    const [announCreatedByRoleId, setAnnounCreatedByRoleId] = useState('');
    const [announCreatedByRoleName, setAnnounCreatedByRoleName] = useState('');
    const [announCreatedByDeptId, setAnnounCreatedByDeptId] = useState('');
    const [announCreatedByDeptName, setAnnounCreatedByDeptName] = useState('');
    const [announCreatedByDesigId, setAnnounCreatedByDesigId] = useState('');
    const [announCreatedByDesigName, setAnnounCreatedByDesigName] = useState('');
    const [announVenue, setAnnounVenue] = useState('');
    const [announTitle, setAnnounTitle] = useState('');
    const [announDescription, setAnnounDescription] = useState('');
    const [announStatus, setAnnounStatus] = useState('');
    const [remark, setRemark] = useState('');



    const [announcements, setAnnouncements] = useState([])
    

    //loading all department and roles while page loading at first time
    useEffect(() => {
        AnnouncementService.getAnnouncementByPaging().then((res) => {
            setAnnouncements(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });
    }, []);

    const showAnnouncementById = (e) => {

        AnnouncementService.getAnnouncementById(e).then(res => {
            let announcement = res.data;
            setAnnounId(announcement.announId)
            setAnnounStartDate(announcement.announStartDate)
            setAnnounEndDate(announcement.announEndDate)
            setAnnounCreatedByEmpId(announcement.announCreatedByEmpId)
            setAnnounCreatedByEmpEId(announcement.announCreatedByEmpEId)
            setAnnounCreatedByEmpName(announcement.announCreatedByEmpName)
            setAnnounCreatedByRoleId(announcement.announCreatedByRoleId)
            setAnnounCreatedByRoleName(announcement.announCreatedByRoleName)
            setAnnounCreatedByDeptId(announcement.announCreatedByDeptId)
            setAnnounCreatedByDeptName(announcement.announCreatedByDeptName)
            setAnnounCreatedByDesigId(announcement.announCreatedByDesigId)
            setAnnounCreatedByDesigName(announcement.announCreatedByDesigName)
            setAnnounVenue(announcement.announVenue)
            setAnnounTitle(announcement.announTitle)
            setAnnounDescription(announcement.announDescription)
            setAnnounStatus(announcement.announStatus)
            

        }
        );
    }

    const cancelAnnouncement = (e) => {

        if (window.confirm("Do you want to cancel this Announcement ?")) {
            AnnouncementService.getAnnouncementById(e).then(res => {
            
                let exsitingAnnouncement = res.data;
              
                let announId = exsitingAnnouncement.announId;
               
           
            
            let announStatus='Cancel'
            let statusCd = 'I';
            let announcement = { announId, announStatus,statusCd};
    
            AnnouncementService.cancelAnnouncement(announcement).then(res => {
                AnnouncementService.getAnnouncementByPaging().then((res) => {
                    setAnnouncements(res.data.responseData.content);
                    console.log(res.data.responseData.content)
                });
                console.log("Announcement cancel");
            }
            );
        });
    
        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
       
    }


    const saveAnnouncement = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let announStatus='Pending'
        let employeeId= Cookies.get('empId');

         let announCreatedByEmpId = Cookies.get('empId')
         let announCreatedByEmpEId = Cookies.get('empEId')
         let announCreatedByEmpName = Cookies.get('empFirstName') +' '+Cookies.get('empMiddleName')+' '+Cookies.get('empLastName')
         let announCreatedByRoleId = Cookies.get('roleId')
         let announCreatedByRoleName = Cookies.get('roleName')
         let announCreatedByDeptId =Cookies.get('deptId')
         let announCreatedByDeptName = Cookies.get('deptName')
         let announCreatedByDesigId =  Cookies.get('desigId')
         let announCreatedByDesigName =  Cookies.get('desigName')
         
         let announcement = { announStartDate, announEndDate,announCreatedByEmpId,announCreatedByEmpEId,announCreatedByEmpName,announCreatedByRoleId,announCreatedByRoleName,announCreatedByDeptId,announCreatedByDeptName,announCreatedByDesigId,announCreatedByDesigName,announVenue,announTitle,announDescription,announStatus, remark, statusCd,employeeId };
        console.log("Meting", announcement)
        AnnouncementService.saveAnnouncementDetails(announcement).then(res => {
            
            AnnouncementService.getAnnouncementByPaging().then((res) => {
                setAnnouncements(res.data.responseData.content);
            });

            
            
        }
        );
        
    }

    return (

        <div>
            <div className="row">
                <h2 className="text-center">Announcement List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-11" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveAnnouncement">Add Announcement</button>

                        </div>
                    </div>
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Organiser Name</th>
                                    <th className="text-center">Organiser Department</th>
                                    <th className="text-center">Organiser Designation</th>

                                    <th className="text-center">Start DateTime</th>
                                    <th className="text-center">End DateTime</th>
                                    <th className="text-center">Announcement Venue</th>
                                    <th className="text-center">Announcement Title</th>
                                    <th className="text-center">Status</th>

                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    announcements.map(
                                        (announcement, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={announcement.announId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{announcement.announCreatedByEmpName}</td>
                                                <td>{announcement.announCreatedByDeptName}</td>
                                                <td>{announcement.announCreatedByDesigName}</td>

                                                <td>{announcement.announStartDate}</td>
                                                <td>{announcement.announEndDate}</td>
                                                <td>{announcement.announVenue}</td>
                                                <td>{announcement.announTitle}</td>
                                                <td>{announcement.announStatus}</td>
                                                <td>
                                                
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showAnnouncementById(announcement.announId)}>View</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" disabled={announcement?.announStatus === "Cancel"} onClick={() => cancelAnnouncement(announcement.announId)}>Cancel</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                {/* Modal for save department details */}
                <div className="modal fade" id="saveAnnouncement" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Announcement</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Announcement Start Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" defaultValue={announStartDate} name="announStartDate" onChange={(e) => setAnnounStartDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement End Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" id="announEndDate" defaultValue={announEndDate} name="announ" onChange={(e) => setAnnounEndDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Location:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="announVenue" placeholder="Enter  Location here" value={announVenue} onChange={(e) => setAnnounVenue(e.target.value)} />

                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Title:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="announTitle" placeholder="Enter  Title here" value={announTitle} onChange={(e) => setAnnounTitle(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Description:</label>
                                        <div className="col-sm-8">
                                            <textarea rows="5" className="form-control" id="announDescription" placeholder="Enter Description here" value={announDescription} onChange={(e) => setAnnounDescription(e.target.value)} />

                                        </div>
                                    </div>



                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveAnnouncement(e)} > Submit</button>
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
                                <h4 className="modal-title">Announcement Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement Start Date Time:</label>
                                        <div className="col-sm-8">
                                            {announStartDate}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Announcement End Date Time:</label>
                                        <div className="col-sm-8">
                                            {announEndDate}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Name:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByEmpName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Employee Id:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByEmpEId}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organisser Department Name:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByDeptName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Designation:</label>
                                        <div className="col-sm-8">
                                            {announCreatedByDesigName}
                                        </div>
                                    </div>




                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Location:</label>
                                        <div className="col-sm-8">
                                            {announVenue}
                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Title:</label>
                                        <div className="col-sm-8">
                                            {announTitle}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Description:</label>
                                        <div className="col-sm-8">
                                            {announDescription}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Status:</label>
                                        <div className="col-sm-8">
                                            {announStatus}
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


        </div>
    );
}