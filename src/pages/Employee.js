import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeList from "../components/employee/EmployeeList";

const Employee = (props) => {
    return <div>
        <EmployeeForm></EmployeeForm>
        <EmployeeList></EmployeeList>
    </div>
}

export default Employee