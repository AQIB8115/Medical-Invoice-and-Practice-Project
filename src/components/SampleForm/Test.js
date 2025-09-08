
import React , { useState } from "react";
import "./sampleform.scss";
const SimpleForm = () => {
    const [inputValue, setInputValue] = useState("");
    const [submittedList, setsubmittedlist] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    // alert(`Submitted: ${inputValue}`);
    // setInputValue("");
    setsubmittedlist([...submittedList, inputValue]);
    setInputValue("");
};

return (
    <div>
    <form onSubmit={handleSubmit}>
        <input
        type="text "

        placeholder="Enter your name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
    />

    <button type="submit">Submit</button>
    </form>
    <h1>Name</h1>
    <ul>
        {submittedList.map((name, index) => (
            <li key={index}>{name}</li> 
        ))}

    </ul>
    </div>
);
};

export default SimpleForm;