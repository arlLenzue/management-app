import { useState, useContext, useEffect } from "react";
import ManagementContext from "../../data/management-context";
import  classes from './Employee.module.css'

const EmployeeForm = (props) => {
  const ctx = useContext(ManagementContext);
  const employees = ctx.employees;

  const [enteredName, setEnteredName] = useState("");
  const [enteredPhoto, setEnteredPhoto] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isOnEditMode, setOnEditMode] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const photoInputChangeHandler = (event) => {
    setEnteredPhoto(event.target.value);
  };
  const isFeatureInputChangeHandler = (event) => {
    setIsFeatured(event.target.checked);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const id_num = employees.length + 1 + Date.now();
    const data = {
      id: "e" + id_num,
      name: enteredName,
      photo: enteredPhoto,
      isFeatured: isFeatured,
      dataCreated: Date.now()
    };

    if (isOnEditMode) {
      data.jobs = ctx.onEdit.data.jobs;
      data.id = ctx.onEdit.data.id;
      ctx.updateItem(data,'employees');
      setOnEditMode(false);
    } else {
      data.jobs = [];
      ctx.addItem(data,'employees');
    }

    setEnteredName("");
    setEnteredPhoto("");
    setIsFeatured(false);
  };

  useEffect(() => {
    if (ctx.onEdit && ctx.onEdit.type === 'employee') {
      const data = ctx.onEdit.data;
      setOnEditMode(true);
      setEnteredName(data.name);
      setEnteredPhoto(data.photo);
      setIsFeatured(data.isFeatured);
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
      <div className="form-control">
        <label htmlFor="photo">Photo</label>
        <input
          type="text"
          value={enteredPhoto}
          required
          onChange={photoInputChangeHandler}
          id="photo"
        />
      </div>
      <div className="form-control">
        <label htmlFor="name">Featured</label>
        <input
          type="checkbox"
          onChange={isFeatureInputChangeHandler}
          id="featured"
          checked={isFeatured}
        />
      </div>
      <div className="form-actions">
        {isOnEditMode && <button type="submit">Update</button>}
        {!isOnEditMode && <button type="submit">Save</button>}
      </div>
    </form>
  );
};

export default EmployeeForm;
