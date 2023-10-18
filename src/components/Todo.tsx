
import React, { useState } from "react";

interface TodoProps {
  id: string;
  desc: string;
  completed: boolean;
  toggleCompleted: (id: string) => void;
  editTodo: (id: string, desc: string) => void;
  deleteTodo: (id: string) => void;
}


const Todo = ({id, desc, completed, toggleCompleted, editTodo, deleteTodo}: TodoProps) => {

  const [isEditing, setEditing] = useState(false);
  const [input, setInput] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    editTodo(id, input);
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
        <button type="button" onClick={() => editTodo(id, desc)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTodo(id)}>
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
