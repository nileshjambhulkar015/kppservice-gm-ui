import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyParameterService from "../../services/KeyParameterService";
export default function AssignEmployeeKppComponent() {
   
    const navigate = useNavigate();
    const [kpps, setKpps] = useState([])
    
   
    useEffect(() => {
        KeyParameterService.getKPPDetailsByPaging().then((res) => {
            setKpps(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
        });
    }, []);

    

    /*const saveKPPDetails = (e) => {
        e.preventDefault()
       
        let statusCd = 'A';
        let kpp = { roleId, deptId,desigId,kppObjective,kppPerformanceIndi, kppOverallTarget,kppTargetPeriod,kppUoM,kppOverallWeightage,kppRating1,kppRating2,kppRating3,kppRating4,kppRating5, remark, statusCd };
        console.log(kpp)

        KeyParameterService.saveKPPDetails(kpp).then(res => {
            KeyParameterService.getKPPDetailsByPaging().then((res) => {
                setKpps(res.data.responseData.content?.filter((item)=>item.roleId!==3 && item.roleId!==4));
            });
            console.log("Kpp added");
        }
        );
        // window.location.reload(); 
    }*/

    return (
        <div className="row">
        <div><button type="submit" className="btn btn-info col-sm-offset-1 "  onClick={() => navigate(`/showEmployeeForKpp`, { replace: true })}> Back</button> <h2 className="text-center">Key Parameter List</h2></div>
        
        
        <div className="col-md-1"></div>
        <div className="col-md-10">
            <div className="row">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Action</th>
                            <th>KPP Objective</th>
                            <th>Performance Indicator</th>

                            <th>Overall Target</th>
                            <th>Target Period</th>
                            <th>UOM</th>
                            <th>Overall Weightage</th>
                            <th>Rating 1</th>
                            <th>Rating 2</th>
                            <th>Rating 3</th>
                            <th>Rating 4</th>
                            <th>Rating 5</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {
                                    kpps.map(
                                        (kpp, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={kpp.kppId}>
                                                <td  className="text-center">{index + 1}</td>
                                                <td className="text-center"> <button type="submit" className="btn btn-info">Assign</button></td>
                                                <td className="text-justify">{kpp.kppObjective}</td>
                                                <td className="text-justify">{kpp.kppPerformanceIndi}</td>
                                                <td className="text-justify">{kpp.kppOverallTarget}</td>
                                                <td className="text-justify">{kpp.kppTargetPeriod}</td>
                                                <td className="text-justify">{kpp.kppUoM}</td>
                                                <td className="text-justify">{kpp.kppOverallWeightage}</td>
                                                <td className="text-justify">{kpp.kppRating1}</td>
                                                <td className="text-justify">{kpp.kppRating2}</td>
                                                <td className="text-justify">{kpp.kppRating3}</td>
                                                <td className="text-justify">{kpp.kppRating4}</td>
                                                <td className="text-justify">{kpp.kppRating5}</td>
                                            </tr>
                                    )
                                } 
                    </tbody>
                </table>
            </div>

        </div>
        <div className="col-md-1"></div>
    </div>
    );}