
import React, { useState } from "react";


const Todo = ({id, desc, completed, toggleCompleted, editTask, deleteTask}) => {

  const [isEditing, setEditing] = useState(false);
  const [input, setInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, input);
    setInput("");
    setEditing(false);
  }

  const viewTemplate = (
    <div>
      <input
        id={id}
        type="checkbox"
        defaultChecked={completed}
        onChange={() => toggleCompleted(id)}
      />
      {desc}

      <div className="btn-group" onClick={() => setEditing(true)}>
        <button type="button" onClick={() => editTask(id, desc)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );


  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={id}>New name for {desc}</label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" onClick={() => setEditing(true)}>
          Save
        </button>
      </div>
    </form>
  );

 
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
