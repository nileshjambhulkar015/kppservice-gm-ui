import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import EmployeeKppService from '../../services/AddHodKppRatingService';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function AddEmployeeKppsRatingComponent() {
    const navigate = useNavigate();
    
   const {empId}=useParams();
console.log("psram empId=", empId)

    const [ekppMonth, setEkppMonth] = useState('');
    const [totalAchivedWeightage, setTotalAchivedWeightage] = useState('0');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('0');
    const [totalOverallTaskCompleted, setTotalOverallTaskCompleted] = useState('0');
    const [ekppStatus, setEkppStatus] = useState('');
    const [remark, setRemark] = useState('');
    const [evidence, setEvidence] = useState('');
    const [empKppStatus, setEmpKppStatus] = useState('Approved')

    const [kppResponses, setKppResponses] = useState([])
    const [employeeKpps, setEmployeeKpps] = useState([{ kppId: "",empId:"",empEId: "", roleId: "", deptId: "", desigId: "", ekppAchivedWeight: "", ekppOverallAchieve: "", ekppOverallTaskComp: "",ekkpMonth:"" }]);
   
    useEffect(() => {
        console.log("empId=", empId)
        EmployeeKppService.getKPPDetails(empId).then((res) => {
            setKppResponses(res.data);
        });
    }, [empId]);

    const onOptionChangeHandler = (event) => {
        console.log("event=", event)
        setEmpKppStatus(event);
    };

    const handleTodoChange = (e, i, kppId, kppOverallTarget) => {
        const field = e.target.name;
        const empKpps = [...employeeKpps];

        empKpps[i] = {
            ...empKpps[i],
            "kppId": kppId,
            "empId": empId,
            "ekppOverallTaskComp": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppAchivedWeight": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekkpMonth":ekppMonth,
            [field]: e.target.value || 0,
        }
        totalOverallTaskComp(empKpps)
        totalOverallAchieve(empKpps)
        totalAchivedWeight(empKpps)
        setEmployeeKpps(empKpps);
    };   

    
    const totalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallTaskComp, 0);
        setTotalAchivedWeightage(sum)
    }

    const totalOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallAchieve, 0);
        setTotalOverAllAchive(sum)
    }

    const totalAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppAchivedWeight, 0);
        setTotalOverallTaskCompleted(sum)
    }
  
    const saveEmployeeKpp = (e) => {
        e.preventDefault()
        let ekppStatus = "Approved";
   
        const payLoad = { "kppUpdateRequests": employeeKpps, totalAchivedWeightage, totalOverAllAchive, totalOverallTaskCompleted, ekppStatus, remark };
        console.log(payLoad)
        EmployeeKppService.updateEmpArroveOrRejectByHod(payLoad).then(res => {
          
           navigate(`/allEmployeeKppStatus`, { replace: true })
        }
        );
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
            <form className="form-horizontal">
            <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Employee Name:</label>
                       <div>{kppResponses?.[0]?.empName}</div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Employee Id:</label>
                       <div>{kppResponses?.[0]?.empEId}</div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-1 text-right" htmlFor="reamrk">Designantion:</label>
                       <div>{kppResponses?.[0]?.desigName}</div>
                    </div>        
                    </form>
            </div>
            <div className="row">

                <form className="form-horizontal">
               
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">

                            <th>Sr No</th>
                                <th>Objective</th>
                                <th>Key Performance Indicator</th>
                                <th>Overall Target</th>
                                <th>Target Period</th>
                                <th>UOM</th>
                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>
                                <th>Overall Weightage</th>
                                <th>HoD Achived Weightage</th>
                                <th>HoD Over All Achive</th>
                                <th>HoD Overall Task Completed</th>

                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>

                             
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kppResponses.map(
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">
                                           <td>{index + 1}</td>
                                            <td className='col-md-2'>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>{kppResponse.ekppAchivedWeight}</td>
                                            <td>{kppResponse.ekppOverallAchieve}</td>
                                            <td>{kppResponse.ekppOverallTaskComp}</td>
                                            <td>{kppResponse.kppOverallWeightage}</td>

                                            <td>{kppResponse.hodAchivedWeight}</td>
                                            <td>{kppResponse.hodOverallAchieve}</td>
                                            <td>{kppResponse.hodOverallTaskComp}</td>

                                            <td>
                                                <input type="text" className="form-control" name="ekppAchivedWeight" defaultValue={0} value={employeeKpps[index]?.ekppAchivedWeight} disabled />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" min="0" name="ekppOverallAchieve" defaultValue={0} onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallTarget)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallTaskComp" defaultValue={0} value={employeeKpps[index]?.ekppOverallTaskComp} disabled />
                                            </td>
                                        </tr>
                                )
                            }
                            <tr className="text-justify">
                                <td></td>
                                <td></td>
                                <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> </td>
                                <td></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}>100</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}>100</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}>100</label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}>100</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}>100</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}>100</label></td>

                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}>{totalAchivedWeightage}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}>{totalOverAllAchive}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}>{totalOverallTaskCompleted}</label></td>

                            </tr>
                        </tbody>
                    </table>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">View Evidence:</label>
                        <div className="col-sm-3">
                            click here..
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                        <div className="col-sm-6">
                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>

               
          
                </form>

            </div>
            <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-4"><button type="submit" className="btn btn-success col-sm-offset-1" onClick={(e) => saveEmployeeKpp(e)} > Submit</button>
                    <button type="submit" className="btn btn-info col-sm-offset-1 "  onClick={() => navigate(`/allEmployeeKppStatus`, { replace: true })}> Back</button>
                 

                </div>
            </div>
            <div className="row">
                <h4>  *Note - Please refere the below table for ratings:</h4>
                <div className="col-sm-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Sr No</th>
                                <th>KPP Objective</th>
                                <th>Rating 1</th>
                                <th>Rating 2</th>
                                <th>Rating 3</th>
                                <th>Rating 4</th>
                                <th>Rating 5</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                kppResponses.map(
                                    (kppResponse, index) =>

                                        <tr className="text-center">

                                            <td>{index + 1}</td>
                                            <td className="text-justify">{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppRating1}</td>
                                            <td>{kppResponse.kppRating2}</td>
                                            <td>{kppResponse.kppRating3}</td>
                                            <td>{kppResponse.kppRating4}</td>
                                            <td>{kppResponse.kppRating5}</td>
                                        </tr>
                                )


                            }

                        </tbody>

                    </table>
                </div></div>       </div>


    );
}