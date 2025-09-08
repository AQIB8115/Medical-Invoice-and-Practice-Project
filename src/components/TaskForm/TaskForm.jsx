import React, { useState } from "react";
import "./TaskForm.scss";

const City = ["Islamabad", "Lahore"];
const Area = {
    Islamabad: ["Gullberg", "Gulzar e Qaid", "Blue area", "Chakshazad", "Ghori Garden"],
    Lahore: ["Gullberg", "Model Town", "DHA", "Garden Town"]
};

const TaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    UserEmail: "",
    City: "",
    Area: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do"
  });

  const [tasks, setTasks] = useState([]);
  const [titleError, setTitleError] = useState(""); // For title validation message
  const [editIndex, setEditIndex] = useState(null);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      if (value.length > 50) return;
      if (value.trim() !== "") setTitleError(""); // clear error on typing
    }
    
    if (name === "UserEmail") {
        if (value.length <= 30) setEmailError("");
        
    }

    if (name === "City") {
        setForm((prev) => ({
            ...prev, City: value, Area: ""
        }));
        return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    setTitleError(""); // clear error after submission
    setEmailError("");

    if (!form.title.trim()) {
      setTitleError("Title is required!");
    //   return;
      hasError = true;
    }
    if (!form.UserEmail.trim()) {
        setEmailError("Email is required!");
        // return;
        hasError = true;
    } else {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.UserEmail)) {
        setEmailError("Invalid email format!");
        // return;
        hasError = true;
    }

    else if (form.UserEmail.length > 30) {
        setEmailError("Email must be less then 30 characters!");
        hasError = true;
    }
    }
    if (hasError) return;


    if (editIndex !== null ) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = form;
        setTasks(updatedTasks);
        setEditIndex(null);
    } else {
         setTasks((prev) => [...prev, form]);
    }

    // const newTask = {
    //   ...form,
    //   status: form.status || "To Do"
    // };


   

    setForm({
      title: "",
      UserEmail: "",
      City: "",
      Area: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "To Do"
    });
    setTitleError(""); // clear error after submission
    setEmailError("");
  };

  const handleEdit = (index) => {
    setForm(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (index === editIndex) {

    setForm({
      title: "",
      UserEmail: "",
      City: "",
      Area: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "To Do"
    });
    setEditIndex(null);
    }
  };

  return (
    <div className="container ">
        <div className="row">
          <div className="col-md-6 text-left">
      <h1 className="display-6">
      {editIndex !== null ? "Edit Task" : "Create New Task"}
      </h1>
      
      <form onSubmit={handleSubmit}>
      
        {/* Title */}
        <div className="col-sm-10 mb-3">
          <label className="form-label">Title (required)</label>
          <input
            type="text"
            className={`form-control ${titleError ? "is-invalid" : ""}`}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <small>{form.title.length}/50 characters</small>
          {titleError && (
            <div className="text-danger mt-4">{titleError}</div>
          )}
        </div>
        <div className="col-sm-6 mb-3">
          <label className="form-label">UserEmail (required)</label>
          <input
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            type = "text"
            name="UserEmail"
            rows="1"
            value={form.UserEmail}
            onChange={handleChange}
            maxLength={30}
          />
          {emailError && <div className="text-danger mt-1">{emailError}</div>}
        </div>
        <div className="col-sm-6 mb-3">
            <label className="form-label">City</label>
            <select
            className="form-select"
            name="City"
            value={form.City}
            onChange={handleChange}
            >
                <option value="">Select City</option>
                {City.map((city) => (
                    <option key={city} value={city}>
                    {city}
                    </option>
                ))}
            </select>
        </div>

        <div className="col-sm-6 mb-3">
            <label className="form-label">Area</label>
            <select
            className="form-select"
            name="Area"
            value={form.Area}
            onChange={handleChange}
            disabled={!form.City}
            >
                <option value="">Select Area</option>
                {form.City &&
                Area[form.City].map((area) => (
                    <option key={area} value={area}>
                        {area}
                    </option>
                ))
                }
            </select>
        </div>

        {/* Description */}
        <div className="col-sm-10 mb-3">
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        {/* Due Date */}
        <div className="row">
        <div className="col-sm-4 mb-3">
          <label className="form-label">Due Date (optional)</label>
          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* Priority */}
        <div className="col-sm-4 mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>

        {/* Status */}
        <div className="col-sm-4 mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
            <option>Blocked</option>
          </select>
        </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? "Update Task" : "Create Task"}
        </button>
      </form>
      </div>

      {/* Task List */}
      <div className="col-md-5">
        <h3 className="display-6">Task List</h3>
        {tasks.length === 0 ? (
          <p>No tasks submitted yet.</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item">
                <strong>{task.title}</strong> <br />
                <small>{task.UserEmail}</small><br />
                <small>{task.City}</small><br />
                <small>{task.Area}</small><br />
                <small><em>{task.description}</em></small> <br />
                <span>Due: {task.dueDate || "N/A"}</span><br />
                <span>Priority: {task.priority} | Status: {task.status}</span> <br />
                <div className="mt-2">
                    <button
                    className="btn-btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                    >
                        Edit
                    </button>
                    <button
                    className="btn-btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                    >
                        Delete
                    </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default TaskForm;
