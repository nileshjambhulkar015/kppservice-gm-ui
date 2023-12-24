import React, { useEffect, useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';
export default function EmployeeKppComponent() {

    const [remark, setRemark] = useState('');
    const [kppResponses, setKppResponses] = useState([])
    const [todos, setTodos] = useState([{ kppId: "1", empId: Cookies.get('empId'), empEId: Cookies.get('empEId'), roleId: Cookies.get('roleId'), deptId: Cookies.get('deptId'), desigId: Cookies.get('desigId'), ekppAchivedWeight: "", ekppOverallAchieve: "", ekppOverallTaskComp: "", ekppAppliedDate: "", ekppEvidence: "", ekppStatus: "Pending" }]);

    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setKppResponses(res.data);

        });
    }, []);

    const handleTodoChange = (e, i) => {
 //console.log("kppId=", kppId)
        const field = e.target.name;
        
        const newTodos = [...todos];
        newTodos[i][field] = e.target.value;
       // newTodos[i][kppId] = kppId;
        setTodos(newTodos);       
        console.log(" todos = ",  todos)
    };

    const saveEmployeeKpp = (e) => {
        e.preventDefault()

        EmployeeKppsService.saveEmployeeKppDetails(todos).then(res => {
           console.log("KPP added");
        }
        );
        // window.location.reload(); 
    }
    return (
        <div className='container-fluid'>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kppResponses.map(
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">
                                            <td>{index + 1}</td>
                                            <td>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td>{kppResponse.kppOverallTarget}</td>
                                            <td>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppAchivedWeight" onChange={event => handleTodoChange(event, index)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallAchieve" onChange={event => handleTodoChange(event, index,kppResponse.kppId)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallTaskComp" onChange={event => handleTodoChange(event, index,kppResponse.kppId)} />
                                            </td>

                                            <td>{kppResponse.kppOverallWeightage}</td>
                                           
                                        </tr>

                                )


                            }

                        </tbody>
                    </table> 
                    <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Upload Evidence:</label>
                                    <div className="col-sm-3">
                                    <input type="file" className="form-control" id="deptName" />
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
                <div className="col-sm-10"></div>
                <div className="col-sm-2"><button type="submit" className="btn btn-success" onClick={(e) => saveEmployeeKpp(e)}> Submit</button>

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