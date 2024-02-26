import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import RegionService from "../../../services/RegionService";
import UoMservice from '../../../services/UoMservice';

export default function UoMComponent() {
    const [uomId, setUomId] = useState('');
    const [uomName, setUomName] = useState('');

    const [remark, setRemark] = useState('');

    const [uoms, setUoms] = useState([])


    //loading all department and roles while page loading at first time
    useEffect(() => {
        UoMservice.getUoMByPaging().then((res) => {
            setUoms(res.data.responseData.content);
        });
    }, []);


    const saveUoM = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId');
        let uom = { uomName, remark, statusCd, employeeId };

        UoMservice.saveUoMDetails(uom).then(res => {

            UoMservice.getUoMByPaging().then((res) => {
                setUoms(res.data.responseData.content); 
            });
            console.log("UoM added");
        }
        );
        // window.location.reload(); 
    }

    const showUoMById = (e) => {

        UoMservice.getUoMById(e).then(res => {

            setUomId(res.data.responseData.uomId)
            setUomName(res.data.responseData.uomName)
            setRemark(res.data.responseData.remark)

        }
        );
        // window.location.reload(); 
    }


    const deleteRegionById = (e) => {
        UoMservice.getUoMById(e).then(res => {

            let uomId = res.data.responseData.uomId;
            let uomName = res.data.responseData.uomName;

            let remark = res.data.responseData.remark;
            let statusCd = 'I';
            let updateRegion = { uomId, uomName, remark, statusCd };

            UoMservice.updateUoM(updateRegion).then(res => {
                UoMservice.getUoMByPaging().then((res) => {
                    setUoms(res.data.responseData.content);
                });
                console.log("UoM deleted");
            }
            );
        }
        );
    }

    const updateRegion = (e) => {
        console.log("oddd added")
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId');
        let region = { uomId, uomName, remark, statusCd, employeeId };

        UoMservice.updateUoM(region).then(res => {
            UoMservice.getUoMByPaging().then((res) => {
                setUoms(res.data.responseData.content);

            });
            console.log("Department added");
        }
        );

    }



    return (

        <div>
            <div className="row">
                <h2 className="text-center">UoM List</h2>
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveUoM">Add UoM</button>

                        </div>
                    </div>
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Region Name</th>

                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    uoms.map(
                                        (uom, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={uom.uomId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{uom.uomName}</td>

                                                <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => showUoMById(uom.uomId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteRegionById(uom.uomId)}>Delete</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

            {/* Modal for save UoM details */}
            <div className="modal fade" id="saveUoM" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add UoM</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter UoM Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="uomName" placeholder="Enter UoM Name here" value={uomName} onChange={(e) => setUomName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveUoM(e)} > Submit</button>
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
                            <h4 className="modal-title">Update UoM</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="uomId" name="uomId" value={uomId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="uomName">Enter UoM Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="uomName" placeholder="Enter UoM Name here" value={uomName} onChange={(e) => setUomName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateRegion(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}