import React from "react";
import { topics } from "../constants.js";
import { useState } from "react";
import { useEffect } from "react";

//deprecated
const Tags = ({ handleChange }) => {
  const [checkedTags, setCheckedTags] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (checkedTags.includes(value)) {
      setCheckedTags(checkedTags.filter((tag) => tag !== value));
    } else {
      setCheckedTags([...checkedTags, value]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleChange(checkedTags);
  };

  useEffect(() => {
    console.log("SavedTags: ", checkedTags);
  }, [checkedTags]);

  return (
    <div>
      {topics.map((topic, index) => (
        <div key={index}>
          <label htmlFor={`checkbox-${index}`}>{topic}</label>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            value={topic}
            checked={checkedTags.includes(topic)}
            onChange={handleCheckboxChange}
          />
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary rounded-pill mt-2"
        onClick={handleSave}
      >
        sauvegarder
      </button>
    </div>
  );
};

export default Tags;
