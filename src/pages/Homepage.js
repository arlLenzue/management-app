import Card from "../components/UI/Card";
import EmployeeItem from "../components/employee/EmployeeItem";
import { useState, useContext, useEffect } from "react";
import ManagementContext from "../data/management-context";
import Slideshow from "../components/UI/SlideShow";
import classes from "./Pages.module.css";

const Homepage = () => {
  const ctx = useContext(ManagementContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const employeesSort = [...ctx.employees];
    employeesSort.sort(function (x, y) {
      return x.dataCreated - y.dataCreated;
    });

    console.log(employeesSort);
    setEmployees(employeesSort);
  }, [ctx.employees]);

  const employeeList = employees.map((employee) => (
    <Card key={employee.id}>
      <EmployeeItem key={employee.id} employee={employee}></EmployeeItem>
    </Card>
  ));

  return (
    <div>
      <Slideshow employees={employees}></Slideshow>
      <div className={classes.container}>{employeeList}</div>
    </div>
  );
};

export default Homepage;
