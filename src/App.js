import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainHeader from "./components/header/MainHeader";
import Employee from "./pages/Employee";
import Job from "./pages/Job";
import ManagementContext from "./data/management-context";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const applyChanges = (target) => {
    if(target === 'employees'){
      setEmployees([...ctx_data[target]]);
    }else{
      setJobs([...ctx_data[target]]);
    }
    localStorage.setItem(target, JSON.stringify(ctx_data[target]));
  };

  const ctx_data = {
    employees: employees,
    jobs: jobs,
    onEdit,
    setOnEdit,
    addItem: (item, target) => {
      ctx_data[target].push(item);
      applyChanges(target);
    },
    removeItem: (id, target) => {
      const index = ctx_data[target].findIndex((x) => x.id === id);
      ctx_data[target].splice(index, 1);
      applyChanges(target);
    },
    updateItem: (data, target) => {
      const index = ctx_data[target].findIndex((x) => x.id === data.id);
      ctx_data[target][index] = data;
      applyChanges(target);
    },
    getJobsData: (jobs) => {

      const retrieveJobs = [];
      jobs.forEach(job => {
        const index = ctx_data.jobs.findIndex((x) => x.id === job);
        retrieveJobs.push(ctx_data.jobs[index]);
      });
      
      return retrieveJobs;
    },
    getAssignedCount: (job_id) => {
      let counter = 0;
      const employeesJobs = employees.map(employee => employee.jobs);
      employeesJobs.forEach(employeesJob => {
        employeesJob.forEach(job => {
          if(job === job_id){
            counter = counter + 1;
          }
        })
      })
      return counter;
    }
  };

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees") || "[]"));
    setJobs(JSON.parse(localStorage.getItem("jobs") || "[]"));
  }, []);

  return (
    <ManagementContext.Provider value={ctx_data}>
      <MainHeader />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/homepage" />
        </Route>
        <Route path="/homepage">
          <Homepage />
        </Route>
        <Route path="/employees" exact>
          <Employee />
        </Route>
        <Route path="/jobs" exact>
          <Job />
        </Route>
      </Switch>
    </ManagementContext.Provider>
  );
}

export default App;
