import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/homepage">Homepage</NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/employees">Employees</NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/jobs">Jobs</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
