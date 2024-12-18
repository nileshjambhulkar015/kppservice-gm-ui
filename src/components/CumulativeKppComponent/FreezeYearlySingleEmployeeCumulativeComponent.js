import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CumulativeService from "../../services/CumulativeService";
import Cookies from 'js-cookie';
import { BASE_URL_API } from "../../services/URLConstants";
import EmployeeService from "../../services/EmployeeService";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import FinancialYearService from "../../services/MasterService/FinancialYearService";
import FreezeCumulativeService from "../../services/FreezeCumulativeService";
export default function FreezeYearlySingleEmployeeCumulativeComponent() {

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [totalMonths, setTotalMonths] = useState()
    const [sumOfEmployeeRatings, setSumOfEmployeeRatings] = useState()
    const [sumOfHodRatings, setSumOfHodRatings] = useState()
    const [sumOfGMRatings, setSumOfGMRatings] = useState()
    const [isSuccess, setIsSuccess] = useState(true)
    const [cummulativeRatings, setCummulativeRatings] = useState()
    const [avgCummulativeRatings, setAvgCummulativeRatings] = useState()


    const [empKeyStrength, setEmpKeyStrength] = useState('');
    const [empAreaOfImprovement, setEmpAreaOfImprovement] = useState('');
    const [empTrainginDevelopmentNeeds, setEmpTrainginDevelopmentNeeds] = useState('');

    const [employees, setEmployees] = useState([])

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [finYear, setFinYear] = useState('');
    const [responseMessage, setResponseMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dataPageable, setDataPageable] = useState([])
  
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Handle data fetching or any other logic here
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const saveFreezeEmployeeKppReport = (e) => {
        e.preventDefault()
        const data = {
            currentPage,
            itemsPerPage
        }
        let statusCd = 'A';
        let empId = Cookies.get('viewSingleEmpIdForKppRatings')
       
        let employeeId = Cookies.get('empId')
        let freezeEmployeeKppReport = { finYear, empId,empKeyStrength, empAreaOfImprovement,empTrainginDevelopmentNeeds, statusCd, employeeId };

        FreezeCumulativeService.saveFreezeEmployeeKppReport(freezeEmployeeKppReport).then(res => {

          alert("success done")

        }
        );
        // window.location.reload(); 
    }


    const loadCumulativeData = () => {
        CumulativeService.getSingleEmployeeKppReportDetailsByPaging().then((res) => {


            if (res.data.success) {
                setIsSuccess(true);
                setSumOfEmployeeRatings(res.data.responseData.sumOfEmployeeRatings)
                setSumOfHodRatings(res.data.responseData.sumOfHodRatings)
                setSumOfGMRatings(res.data.responseData.sumOfGMRatings)
                setCummulativeRatings(res.data.responseData.cummulativeRatings)
                setTotalMonths(res.data.responseData.totalMonths)
                setAvgCummulativeRatings(res.data.responseData.avgCummulativeRatings)

                setEmployees(res.data.responseData.employeeKppStatusResponses.content);
            }
            else {
                //alert("Kpp is not approved for month");
                setResponseMessage(res.data.responseMessage)
                setIsSuccess(false);
            }

        }).catch((err) => {
            alert(err.response.data.details)
        });

        EmployeeService.searchEmployeeById(Cookies.get('viewSingleEmpIdForKppRatings')).then((res) => {
            setEmpId(res.data.empId)
            setEmpEId(res.data.empEId)
            setEmpName(res.data.empFirstName + ' ' + res.data.empMiddleName + ' ' + res.data.empLastName)
            setRoleName(res.data.roleName)
            setDeptName(res.data.deptName)
            setDesigName(res.data.desigName)
        });

    }

    useEffect(() => {
        loadCumulativeData();

        FinancialYearService.getFinancialYearById(1).then((res)=>{
            setFinYear(res.data.finYear)
        });
    }, []);

    

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }

    const navigateToViewEmployeeRating = () => {

        Cookies.remove('viewSingleEmpIdForKppRatings');
        navigate(`/freezeYearlyViewEmployeeCumulativeKpp`, { replace: true })
    }

    return (
        <div className="row">
            <div className="row" >
                <form className="form-horizontal">
                    <div className="col-md-10">

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Name :</label>
                            <div className="col-sm-5">
                                {empName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Employee Id :</label>
                            <div className="col-sm-5">
                                {empEId}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Role :</label>
                            <div className="col-sm-5">
                                {roleName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Department :</label>
                            <div className="col-sm-5">
                                {deptName}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2"  >Designation:</label>
                            <div className="col-sm-5">
                                {desigName}
                            </div>
                        </div>

                        <div className="form-group">
                        <label className="control-label col-sm-2"  >Financial Year:</label>
                        <div className="col-sm-5">
                            {finYear}
                        </div>
                    </div>


                    </div>
                </form>
            </div>


            <h3 className="text-center">View Yearly Emplyee KPP Report</h3>
            <div className="form-group">
              
                <button type="submit" className="col-sm-offset-8 btn btn-primary" onClick={(e) => navigateToViewEmployeeRating()}>Back</button>
            </div>


            <div className="col-sm-10">
                {isSuccess ?
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Sr No</th>
                                <th className="text-center">KPP Month</th>
                                <th className="text-center">Employee Ratings</th>
                                <th className="text-center">HOD Ratings</th>
                                <th className="text-center">GM Ratings Name</th>
                                <th className="text-center">Total Ratings</th>
                                <th className="text-center">Evidence</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    (employee, index) =>   //index is inbuilt variable of map started with 0
                                        <tr key={employee.empId}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-justify">{YYYY_MM_DD_Formater(employee.ekppMonth)}</td>
                                            <td className="text-center">{employee.empOverallAchive}</td>
                                            <td className="text-center">{employee.hodOverallAchieve}</td>
                                            <td className="text-center">{employee.gmOverallAchieve}</td>
                                            <td className="text-center">{employee.sumOfRatings}</td>
                                            <td className="text-center">
                                                <div className="col-sm-3">
                                                    <a href={BASE_URL_API + `/report-evidence?empId=${employee.empId}&evMonth=${YYYY_MM_DD_Formater(employee.ekppMonth)}`}>
                                                        View</a>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <a href={BASE_URL_API + `/report/completed-employee-kpp-status?empId=${employee.empId}&ekppMonth=${YYYY_MM_DD_Formater(employee.ekppMonth)}`}>
                                                    <button type="submit" className="btn btn-info">Download</button>
                                                </a>
                                            </td>
                                        </tr>

                                )

                            }
                            <tr>
                                <th className="text-right">Total</th>
                                <td className="text-center"></td>
                                <td className="text-center">{sumOfEmployeeRatings}</td>
                                <td className="text-center">{sumOfHodRatings}</td>
                                <td className="text-center">{sumOfGMRatings}</td>
                                <td className="text-center"></td>
                                <td className="text-center"></td>
                            </tr>
                            <tr>
                                <th className="text-right">Overall Cummalative Ratings: </th>
                                <td className="text-center">{cummulativeRatings}</td>
                            </tr>
                            <tr>
                                <th className="text-right">Total Months:</th>
                                <td className="text-center">{totalMonths}</td>

                            </tr>
                            <tr>
                                <th className="text-right">Average Cummalative Ratings:</th>
                                <td className="text-center">{avgCummulativeRatings}</td>

                            </tr>
                        </tbody>

                    </table>
                    : <h1>{responseMessage}</h1>}
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={dataPageable.totalPages || 10}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} />
            </div>
            <div className="row col-sm-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="row">
                            <label className="control-label col-sm-2" htmlFor="reamrk"> Enter Key Strengths:</label>
                            <div className="col-sm-5">
                                
                                <textarea rows="3" cols="500" className="form-control" id="empKeyStrength" name="empKeyStrength" defaultValue={empKeyStrength} placeholder="Enter  Key Strengths here" onChange={(e) => setEmpKeyStrength(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    
                    <div className="form-group">
                        <div className="row">
                            <label className="control-label col-sm-2" htmlFor="reamrk">Enter Area of Improvement:</label>
                            <div className="col-sm-5">
                            <textarea row="5" className="form-control" id="empAreaOfImprovement" name="empAreaOfImprovement" defaultValue={empAreaOfImprovement} placeholder="Enter Area of Improvement here" onChange={(e) => setEmpAreaOfImprovement(e.target.value)} />
                               
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="control-label col-sm-2" htmlFor="reamrk">Enter Training & Development Needs :</label>
                            <div className="col-sm-5">
                            <textarea row="5" className="form-control" id="empTrainginDevelopmentNeeds" name="empTrainginDevelopmentNeeds" defaultValue={empTrainginDevelopmentNeeds} placeholder="Enter Training & Development Needs here" onChange={(e) => setEmpTrainginDevelopmentNeeds(e.target.value)} />
    
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                    <div className="row">
                        <button type="submit" className="btn btn-success col-sm-offset-6" onClick={(e) => saveFreezeEmployeeKppReport(e)}> Submit</button>
                        <button type="submit" className="btn btn-info col-sm-offset-1"> Back</button>
                    </div>
                </div>
                </form>
            </div>



        </div>

    );
}