import { useState, useContext, useEffect } from "react";
import ManagementContext from "../../data/management-context";
import  classes from './Job.module.css'

const JobForm = (props) => {
  const ctx = useContext(ManagementContext);
  const jobs = ctx.jobs;

  const [enteredName, setEnteredName] = useState("");
  const [isOnEditMode, setOnEditMode] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const id_num = jobs.length + 1 + Date.now();
    const data = {
      id: "e" + id_num,
      name: enteredName,
      dateCreated: Date.now()
    };

    if (isOnEditMode) {
      data.id = ctx.onEdit.data.id;
      ctx.updateItem(data,'jobs');
      setOnEditMode(false);
    } else {
      ctx.addItem(data,'jobs');
    }

    setEnteredName("");
  };

  useEffect(() => {
    if (ctx.onEdit && ctx.onEdit.type === 'job') {
      setOnEditMode(true);
      setEnteredName(ctx.onEdit.data.name);
    } 
  }, [ctx.onEdit]);

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={enteredName}
          required
          onChange={nameInputChangeHandler}
          id="name"
        />
      </div>
      <div className="form-actions">
        {isOnEditMode && <button type="submit">Update</button>}
        {!isOnEditMode && <button type="submit">Save</button>}
      </div>
    </form>
  );
};

export default JobForm;
