import { useContext, useEffect, useState } from "react";
import ManagementContext from "../../data/management-context";
import  classes from './Job.module.css'

const JobList = () => {

  const ctx = useContext(ManagementContext);
  const [jobs,setJobs] = useState([]);

  useEffect(() => {
    setJobs(ctx.jobs);
  },[ctx.jobs]);
  
  const editHandler = (job) => {
    ctx.setOnEdit({type: 'job' ,data:job});
  }  
  const getAssingedCount = (id) => {
    return ctx.getAssignedCount(id);
  }

  if(jobs.length <= 0){
    return ""
  }


  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Assigned Count</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => {
          return (
            <tr key={job.id}>
              <td>{job.name}</td>
              <td>{getAssingedCount(job.id)}</td>
              <td><button disabled={getAssingedCount(job.id) > 0} onClick={() => {ctx.removeItem(job.id, 'jobs')}}>Delete</button></td>
              <td><button onClick={() => {editHandler(job)}}>Edit</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default JobList;
