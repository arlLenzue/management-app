import classes from "./Employee.module.css";

const EmployeeItem = (props) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const format_date =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    return format_date;
  };

  return (
    <div className={classes.employee}>
      <div className={classes.employeeImg}>
        <img src={props.employee.photo} alt={props.employee.id + "image"} />
      </div>
      <div>
        <label>Name:</label>
        <p>{props.employee.name}</p>
        <label>Joined:</label>
        <p>{formatDate(props.employee.dataCreated)}</p>
      </div>
    </div>
  );
};

export default EmployeeItem;
