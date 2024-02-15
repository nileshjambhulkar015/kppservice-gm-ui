import React from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';

import Cookies from 'js-cookie';
import EmployeeKppsService from '../../services/EmployeeKppsService';

const EmplyeeUpdateKppRatingsComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [hodRemark, setHodRemark] = useState('');
    const [hodKppStatus, setHodKppStatus] = useState('Approved');

    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])
    const sumOfGmAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.gmAchivedWeight), 0);
        return sum;
    }

        //for gm approved or reject status selection
        const onHodStatusChangeHandler = (event) => {
            setHodKppStatus(event);
        };

    const sumGmOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.gmOverallAchieve), 0);
        return sum;
    }
    const sumGmOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.gmOverallTaskComp), 0);
        return sum;
    }
    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setKppMasterResponses(res.data);
            setHodRemark(res.data.hodRemark)
            setKppDetailsResponses(res.data.kppStatusDetails)
        });
    }, []);

    const handleExcel=()=>{
        EmployeeKppsService.getEmployeeKPPReport(Cookies.get('empId')).then(res => {
            alert("Report generated");
        });
    }
    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalGmAchivedWeight: 0,
                    totalGmOverallAchieve: 0,
                    totalGmOverallTaskComp: 0
                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        
                        
                        const payload = { "kppUpdateRequests": values?.fields, "totalGmAchivedWeight": values?.totalHodAchivedWeight, "totalGmOverallAchieve": values?.totalHodOverallAchieve, "totalGmOverallTaskComp": values?.totalHodOverallTaskComp, hodKppStatus, hodRemark };
                        EmployeeKppsService.saveEmployeeKppRatingByHod(payload).then(res => {
                            alert("Employee KPP added");
                        });
                    }}>
                    {({ values, setFieldValue }) => {

                        const handleTodoChange = (e, i, kppId, kppOverallWeightage, totalGmOverallTaskComp, kppRating1) => {
                            console.log("e.target.value : ", e.target.value)
                            const field = e.target.name?.split(".")[1];
                            console.log("kppDetailsResponses[i].hodOverallTaskComp =", totalGmOverallTaskComp)

                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],


                                "kppId": kppId,
                                "empId": Cookies.get('empIdForKppRatings'),                               
                     
                                "gmOverallTaskComp": field === "gmOverallAchieve" && !!e.target.value ? (Number(e.target.value) / 5 * 100).toFixed(1) : 0,
                                "gmAchivedWeight": field === "gmOverallAchieve" && !!e.target.value ? ((kppOverallWeightage * (Number(e.target.value) / 5 * 100).toFixed(1)) / 100).toFixed(1) : 0,
                                "ekppMonth": ekppMonth,
                                [field]: parseInt(e.target.value || 0),
                            }
                            setFieldValue("totalGmOverallTaskComp",sumGmOverallTaskComp(kppDetailsResponses));
                            setFieldValue("totalGmOverallAchieve", sumGmOverallAchieve(kppDetailsResponses));
                            setFieldValue("totalGmAchivedWeight",sumOfGmAchivedWeight(kppDetailsResponses));
                            setFieldValue("fields", kppDetailsResponses)
                        };
                        return (
                            <Form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-1 "  >Select Date:</label>
                                    <div className="col-sm-2">
                                        <input type="date" className="form-control" name="ekppMonth" onChange={(e) => setEkppMonth(e.target.value)} />
                                    </div>
                                </div>
                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                        <td colSpan={21} className="text-center"><b>EMPLOYEE-WISE KEY PERFORMANCE INDICATORS (KPIs) FY 2022-2023</b></td>
                                        </tr>
                                        <tr>
                                        <th rowSpan={2} className="text-center">Sr No</th>
                                        <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                        <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                        <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                        <th rowSpan={2} className="text-center">UOM</th>
                                        <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                        <th rowSpan={2} className="text-center">OVERALL ACHIEVEMENT</th>
                                        <th rowSpan={2} className="text-center">% OF TOTAL TASK COMPLETED</th>

                                        <th rowSpan={2} className="text-center">Hod Achived Weightage</th>
                                        <th rowSpan={2} className="text-center">Hod Ratings</th>
                                        <th rowSpan={2} className="text-center">Hod Overall Task Completed</th>
                                        <th rowSpan={2} className="text-center">GM Achived Weightage</th>
                                        <th rowSpan={2} className="text-center">GM Ratings</th>
                                        <th rowSpan={2} className="text-center">GM Overall Task Completed</th>
                                        <th colSpan={5} className="text-center">RATING RATIO COULD BE CHANGED AS PER TARGETS</th>
                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">ACHIEVED WEIGHTAGE IN % </th>                                           
                                            <th className="text-center">Rating 1</th>
                                            <th className="text-center">Rating 2</th>
                                            <th className="text-center">Rating 3</th>
                                            <th className="text-center">Rating 4</th>
                                            <th className="text-center">Rating 5</th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>
                                        {values?.fields?.map(
                                            (kppResponse, index) =>
                                                <tr key={kppResponse.kppId} className="text-justify">
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{kppResponse.kppObjective}</td>
                                                    <td>{kppResponse.kppPerformanceIndi}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                                    <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                                    <td>{kppResponse.kppUoM}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>
                                                   
                                                    <td className='text-center'>{kppResponse.empAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.empOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.empOverallTaskComp}</td>

                                                    <td className='text-center'>{kppResponse.hodAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallTaskComp}</td>
                                                   
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.gmAchivedWeight`} value={values?.fields?.[index]?.gmAchivedWeight} disabled />
                                                    </td>

                                                    <td>
                                                        <input type="number" className="form-control"
                                                            name={`${index}.gmOverallAchieve`}
                                                            min={0}
                                                            defaultValue={values?.fields?.[index]?.gmOverallAchieve}

                                                            onKeyDown={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.hodOverallTaskComp, kppResponse.kppRating1)}
                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.hodOverallTaskComp, kppResponse.kppRating1)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.gmOverallTaskComp`} value={values?.fields?.[index]?.gmOverallTaskComp} disabled />
                                                    </td>

                                                   
                                                   
                                                    <td className='text-center'>{kppResponse.kppRating1}</td>
                                                    <td className='text-center'>{kppResponse.kppRating2}</td>
                                                    <td className='text-center'>{kppResponse.kppRating3}</td>
                                                    <td className='text-center'>{kppResponse.kppRating4}</td>
                                                    <td className='text-center'>{kppResponse.kppRating5}</td>

                                                </tr>
                                        )}
                                        <tr className="text-justify">
                                            <td></td>
                                            <td></td>
                                            <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> </td>
                                            <td></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalEmpOverallTaskComp}</label></td>
                                           
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmAchivedWeight === 0 ? sumOfGmAchivedWeight(values?.fields) : values?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmOverallAchieve === 0 ? sumGmOverallAchieve(values?.fields) : values?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalGmOverallTaskComp === 0 ? sumGmOverallTaskComp(values?.fields) : values?.totalGmOverallTaskComp}</label></td>

                                        </tr>
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">View Evidence:</label>
                                    <div className="col-sm-3">
                                        click here to download
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="empRemark">Enter Remark:</label>
                                    <div className="col-sm-6">
                                        <textarea row="5" className="form-control" id="hodRemark" name="hodRemark" defaultValue={hodRemark} placeholder="Enter Remark here" onChange={(e) => setHodRemark(e.target.value)} />
                                    </div>
                                </div>
                    
                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="hodKppStatus">Hod Status:</label>
                                <div className="col-sm-2">
                                    <select className="form-control" id="hodKppStatus" onChange={(e) => onHodStatusChangeHandler(e.target.value)} defaultValue={hodKppStatus} >
                                        <option value="Approved">Approved</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </div>
                                </div>

                               

                               
                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success"> Submit</button>
                                        
                                    <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}   
                                    onClick={() => { handleExcel()
                                          
                                        }}> Download</button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    );
}
export default EmplyeeUpdateKppRatingsComponent;