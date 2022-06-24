import { useContext, useEffect, useState } from "react";
import ManagementContext from "../../data/management-context";
import Select from 'react-select'
import classes from './Employee.module.css'

const EmployeeList = () => {

  const ctx = useContext(ManagementContext);
  const [employees,setEmployees] = useState([]);
  const jobs = ctx.jobs;

  useEffect(() => {
    setEmployees(ctx.employees);
  },[ctx.employees]);
  
  const editHandler = (employee) => {
    ctx.setOnEdit({type: 'employee' ,data: employee});
  }

  const addJobHandler = (employee,selections) => {
    employee.jobs = selections.map(job => job.id);
    ctx.updateItem(employee,'employees');
  }

  const getJobsData = (jobs) => {
    if(jobs.length > 0){
      return ctx.getJobsData(jobs);
    }
  }

  if(employees.length <= 0){
    return ""
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Photo</th>
          <th></th>
          <th></th>
          <th>Jobs</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td><img src={employee.photo} alt={employee.id + 'image'} /></td>
              <td><button onClick={() => {ctx.removeItem(employee.id,'employees')}}>Delete</button></td>
              <td><button onClick={() => {editHandler(employee)}}>Edit</button></td>
              <td>
              <Select
                  isMulti
                  value={getJobsData(employee.jobs)}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={(selections) => addJobHandler(employee, selections)}
                  options={jobs}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeList;
