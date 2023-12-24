import React, { useState, useEffect } from "react";
import DepartmentService from "../../services/DepartmentService";
import KeyParameterService from "../../services/KeyParameterService";
import DesignationService from "../../services/DesignationService";
import RoleService from "../../services/RoleService";

export default function KeyParameterComponent() {
    const [kppId, setKppId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [kppObjective, setKppObjective] = useState('');
    const [kppPerformanceIndi, setKppPerformanceIndi] = useState('');
    const [kppOverallTarget, setKppOverallTarget] = useState('');
    const [kppTargetPeriod, setKppTargetPeriod] = useState('');    
    const [kppUoM, setKppUoM] = useState('');
    const [kppOverallWeightage, setKppOverallWeightage] = useState('');
    const [kppRating1, setKppRating1] = useState('');
    const [kppRating2, setKppRating2] = useState('');
    const [kppRating3, setKppRating3] = useState('');
    const [kppRating4, setKppRating4] = useState('');
    const [kppRating5, setKppRating5] = useState('');   
    const [remark, setRemark] = useState('');
   
    
    
    const [kpps, setKpps] = useState([])
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])
    const [roles, setRoles] = useState([])

    const [kppObjectiveSearch, setKppObjectiveSearch] = useState('');
   
    const searchKppObjective = (e) => {
        KeyParameterService.getKPPDetailsByKppObjectivePaging(e).then((res) => {
            setKpps(res.data.responseData.content);
            console.log(res.data)
        });
    }

    const showKppById = (e) => {

        KeyParameterService.getKppById(e).then(res => {
            let kpp = res.data;
            console.log(kpp)
            setKppId(kpp.kppId)
            setRoleId(kpp.roleId)
            setRoleName(kpp.roleName)
            setDeptId(kpp.deptId)
            setDeptName(kpp.deptName)
            setDesigId(kpp.desigId)
            setDesigName(kpp.desigName)
            setKppObjective(kpp.kppObjective)
            setKppPerformanceIndi(kpp.kppPerformanceIndi)
            setKppOverallTarget(kpp.kppOverallTarget)
            setKppTargetPeriod(kpp.kppTargetPeriod)
            setKppUoM(kpp.kppUoM)
            setKppOverallWeightage(kpp.kppOverallWeightage)
            setKppRating1(kpp.kppRating1)
            setKppRating2(kpp.kppRating2)
            setKppRating3(kpp.kppRating3)
            setKppRating4(kpp.kppRating4)
            setKppRating5(kpp.kppRating5)
            setRemark(kpp.remark)
        }
        );
        // window.location.reload(); 
    }

    useEffect(() => {
        KeyParameterService.getKPPDetailsByPaging().then((res) => {
            setKpps(res.data.responseData.content);
        });

        RoleService.getRolesInDesignation().then((res) => {
            setRoles(res.data);
        });
    }, []);

     //for all department by role id
     useEffect((e)=>{
        roleId && DepartmentService.getDepartmentByRoleIdFromDesign(roleId).then((res) => {
            setDepartments( res.data);
         });
     },[roleId]);

       //for all designation  by dept id
       useEffect((e)=>{
        deptId && DesignationService.getDesignationDetailsForKpp(deptId).then((res) => {
            setDesignations( res.data);
         });
     },[deptId]);

    const saveKPPDetails = (e) => {
        e.preventDefault()
       
        let statusCd = 'A';
        let kpp = { roleId, deptId,desigId,kppObjective,kppPerformanceIndi, kppOverallTarget,kppTargetPeriod,kppUoM,kppOverallWeightage,kppRating1,kppRating2,kppRating3,kppRating4,kppRating5, remark, statusCd };
        console.log(kpp)

        KeyParameterService.saveKPPDetails(kpp).then(res => {
            KeyParameterService.getKPPDetailsByPaging().then((res) => {
                setKpps(res.data.responseData.content);
            });
            console.log("Kpp added");
        }
        );
        // window.location.reload(); 
    }

    const deleteKppById = (e) => {
        KeyParameterService.getKppById(e).then(res => {
            let kpp = res.data;
            console.log(kpp)
            let kppId=kpp.kppId;
            let roleId = kpp.roleId;
            let deptId=kpp.deptId;
            let desigId=kpp.desigId;
            let kppObjective=kpp.kppObjective;
            let kppPerformanceIndi=kpp.kppPerformanceIndi;
            let kppOverallTarget=kpp.kppOverallTarget;
            let kppTargetPeriod=kpp.kppTargetPeriod;
            let kppUoM=kpp.kppUoM;
            let kppOverallWeightage=kpp.kppOverallWeightage;
            let kppRating1=kpp.kppRating1;
            let kppRating2=kpp.kppRating2;
            let kppRating3=kpp.kppRating3;
            let kppRating4=kpp.kppRating4;
            let kppRating5=kpp.kppRating5;
            let remark=kpp.remark;
            
           console.log("deptId",deptId)
           console.log("KppId=",kppId)
            let statusCd = 'I';
            let updateKpp = {roleId, kppId,deptId,desigId ,kppObjective,kppPerformanceIndi,kppOverallTarget,kppTargetPeriod,kppUoM,kppOverallWeightage,kppRating1,kppRating2,kppRating3,kppRating4,kppRating5, remark, statusCd };

            KeyParameterService.updateKppDetails(updateKpp).then(res => {
                KeyParameterService.getKPPDetailsByPaging().then((res) => {
                    setKpps(res.data.responseData.content);
                });
                console.log("Kpp deleted");
            }
            );
        }
        );
    }

    const updateKppDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let updateKpp = {kppId,roleId, deptId,desigId ,kppObjective,kppPerformanceIndi,kppOverallTarget,kppTargetPeriod,kppUoM,kppOverallWeightage,kppRating1,kppRating2,kppRating3,kppRating4,kppRating5, remark, statusCd };
        
        KeyParameterService.updateKppDetails(updateKpp).then(res => {
            KeyParameterService.getKPPDetailsByPaging().then((res) => {
                setKpps(res.data.responseData.content);
            });
            console.log("Department added");
        }
        );

    }

    return (
        <div className="row">
        <h2 className="text-center">Key Parameter List</h2>
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="row">
                <div className="col-sm-8"> 
                <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-3" htmlFor="kppObjectiveSearch">Enter KPP Objective:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="kppObjectiveSearch" placeholder="Enter Role Name"  value={kppObjectiveSearch} onChange={(e) => setKppObjectiveSearch(e.target.value)}/>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-primary" onClick={() => searchKppObjective(kppObjectiveSearch)}>Search</button>
                            </div>
                </div>
                <div className="col-sm-4"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#saveKpp">Add Key Parameter</button></div>
            </div>
            <div className="row">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                          
                            <th>Department Name</th>
                            <th>Designation Name</th>
                            <th>Role Name</th>
                            <th>KPP Objective</th>
                            <th>Performance Indicator</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                    kpps.map(
                                        (kpp, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={kpp.kppId}>
                                                <td>{index + 1}</td>
                                               
                                                <td>{kpp.deptName}</td>
                                                <td>{kpp.desigName}</td>
                                                <td>{kpp.roleName}</td>
                                                <td className="text-justify">{kpp.kppObjective}</td>
                                                <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                                <td className="col-sm-3"> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateKpp" onClick={() => showKppById(kpp.kppId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteKppById(kpp.kppId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showKpp" onClick={() => showKppById(kpp.kppId)}>View</button></td>
                                                
                                            </tr>
                                    )
                                } 
                    </tbody>
                </table>
            </div>

        </div>
        <div className="col-md-2"></div>

{/** Save Kpp details */}
        <div className="modal fade" id="saveKpp" role="dialog">
            <div className="modal-dialog modal-lg">


                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Add Key Parameter</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal">

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptId">Select Department Name:</label>
                                <div className="col-sm-4">
                                    <div className="form-group">
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
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptId">Select Department Name:</label>
                                <div className="col-sm-4">
                                    <div className="form-group">
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
                                <label className="control-label col-sm-4" htmlFor="desigId">Select Designation Name:</label>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <select className="form-control" id="desigId"  onChange={(e) => setDesigId(e.target.value)}>
                                        <option>--Select Designation--</option>
                                                    {
                                                        designations.map(
                                                            designation =>
                                                                <option key={designation.desigId} value={designation.desigId}>{designation.desigName}</option>
                                                        )
                                                    };

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="kppObjective" value={kppObjective} onChange={(e) => setKppObjective(e.target.value)} placeholder="KPP Objective here"  />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="kppPerformanceIndi" value={kppPerformanceIndi} onChange={(e) => setKppPerformanceIndi(e.target.value)} placeholder="Enter KPP Performance Infdicator here"  />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppOverallTarget">Overall Target:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppOverallTarget" value={kppOverallTarget} onChange={(e) => setKppOverallTarget(e.target.value)} placeholder="Enter KPP ObjectiveOverall Target here" />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppTargetPeriod">Target Period:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppTargetPeriod" value={kppTargetPeriod} onChange={(e) => setKppTargetPeriod(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppUoM">Unit of Measurement:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppUoM" value={kppUoM} onChange={(e) => setKppUoM(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppOverallWeightage">Kpp Target Period:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppOverallWeightage" value={kppOverallWeightage} onChange={(e) => setKppOverallWeightage(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                </div>
                            </div>



                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating1" value={kppRating1} onChange={(e) => setKppRating1(e.target.value)} placeholder="Enter KPP Rating 1 here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 2:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating2" value={kppRating2} onChange={(e) => setKppRating2(e.target.value)} placeholder="Enter KPP Rating 2 here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating3" value={kppRating3} onChange={(e) => setKppRating3(e.target.value)} placeholder="Enter KPP Rating 3 here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 4:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating4" value={kppRating4} onChange={(e) => setKppRating4(e.target.value)} placeholder="Enter KPP Rating 4 here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating5" value={kppRating5} onChange={(e) => setKppRating5(e.target.value)} placeholder="Enter KPP Rating 5 here"  />
                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here"  />
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success"  data-dismiss="modal" onClick={(e) => saveKPPDetails(e)}> Submit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

{/**Update Kpp */}
<div className="modal fade" id="updateKpp" role="dialog">
            <div className="modal-dialog modal-lg">


                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Update Key Parameter</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal">
                        <div> <input type="hidden" id="kppId" name="kppId" value={kppId} /></div>
                        <div className="form-group">
                            <div> <input type="hidden" id="roleId" name="roleId" value={roleId} /></div>
                                <label className="control-label col-sm-4" htmlFor="roleName">Select Role Name:</label>
                                <div className="col-sm-4">
                                    {roleName}
                                </div>
                            </div>
                            <div className="form-group">
                            <div> <input type="hidden" id="deptId" name="deptId" value={deptId} /></div>
                                <label className="control-label col-sm-4" htmlFor="deptName">Select Department Name:</label>
                                <div className="col-sm-4">
                                    {deptName}
                                </div>
                            </div>

                            <div className="form-group">
                            <div> <input type="hidden" id="desigId" name="desigId" value={desigId} /></div>
                                <label className="control-label col-sm-4" htmlFor="desigId">Select Designation Name:</label>
                                <div className="col-sm-4">
                                   {desigName}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="kppObjective" value={kppObjective} onChange={(e) => setKppObjective(e.target.value)} placeholder="KPP Objective here"  />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="kppPerformanceIndi" value={kppPerformanceIndi} onChange={(e) => setKppPerformanceIndi(e.target.value)} placeholder="Enter KPP Performance Infdicator here"  />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppOverallTarget">Overall Target:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppOverallTarget" value={kppOverallTarget} onChange={(e) => setKppOverallTarget(e.target.value)} placeholder="Enter KPP ObjectiveOverall Target here" />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppTargetPeriod">Target Period:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppTargetPeriod" value={kppTargetPeriod} onChange={(e) => setKppTargetPeriod(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppUoM">Unit of Measurement:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppUoM" value={kppUoM} onChange={(e) => setKppUoM(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppOverallWeightage">Kpp Target Period:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppOverallWeightage" value={kppOverallWeightage} onChange={(e) => setKppOverallWeightage(e.target.value)} placeholder="Enter KPP Kpp Target Period here"  />
                                    </div>
                                </div>
                            </div>



                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating1" value={kppRating1} onChange={(e) => setKppRating1(e.target.value)} placeholder="Enter KPP Rating 1 here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 2:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating2" value={kppRating2} onChange={(e) => setKppRating2(e.target.value)} placeholder="Enter KPP Rating 2 here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating3" value={kppRating3} onChange={(e) => setKppRating3(e.target.value)} placeholder="Enter KPP Rating 3 here"  />
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating1">Rating 4:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating4" value={kppRating4} onChange={(e) => setKppRating4(e.target.value)} placeholder="Enter KPP Rating 4 here"  />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="kppRating5" value={kppRating5} onChange={(e) => setKppRating5(e.target.value)} placeholder="Enter KPP Rating 5 here"  />
                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                <div className="col-sm-8">
                                    <textarea row="4" className="form-control" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter Remark here"  />
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success"  data-dismiss="modal" onClick={(e) => updateKppDetails(e)}> Submit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

{/** show KPP details */}    
<div className="modal fade" id="showKpp" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Key Parameter Details</h4>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal">
                        
                        <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="roleName">Role Name:</label>
                                <div className="col-sm-4">
                                {roleName}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Department Name:</label>
                                <div className="col-sm-4">
                                {deptName}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="desigId">Select Designation Name:</label>
                                <div className="col-sm-4">
                                {desigName}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppObjective">KPP Objective:</label>
                                <div className="col-sm-8">
                                   {kppObjective}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="kppPerformanceIndi">Kpp Performance Indicator:</label>
                                <div className="col-sm-8">
                                    {kppPerformanceIndi}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppOverallTarget">Overall Target:</label>
                                    <div className="col-sm-2">
                                        {kppOverallTarget}
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppTargetPeriod">Target Period:</label>
                                    <div className="col-sm-2">
                                        {kppTargetPeriod}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppUoM">Unit of Measurement:</label>
                                    <div className="col-sm-2">
                                        {kppUoM}
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppOverallWeightage">Kpp Target Period:</label>
                                    <div className="col-sm-2">
                                       {kppOverallWeightage}
                                    </div>
                                </div>
                            </div>



                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating1">Rating 1:</label>
                                    <div className="col-sm-2">
                                        {kppRating1}
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating2">Rating 2:</label>
                                    <div className="col-sm-2">
                                        {kppRating2}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating3">Rating 3:</label>
                                    <div className="col-sm-2">
                                        {kppRating3}
                                    </div>
                                    <label className="control-label col-sm-3" htmlFor="kppRating4">Rating 4:</label>
                                    <div className="col-sm-2">
                                       {kppRating4}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label className="control-label col-sm-3 col-sm-offset-1" htmlFor="kppRating5">Rating 5:</label>
                                    <div className="col-sm-2">
                                      {kppRating5}
                                    </div>

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