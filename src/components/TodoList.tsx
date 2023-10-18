
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { fetchFromDB, addTodosDB, updateTodosDB, deleteTodoDB } from "../db/operations.js";


import { ITodo , INewTodo} from "../types/Todo.types";

const TodoList = () => {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [toggled, setToggle] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTodo();
    setInput("");
  }

  function toggleCompleted(id: string) {
    toggled ? setToggle(false) : setToggle(true);

    const updatedTasks = todos.map((item) => {
      if (id === item.id) {
        updateTodosDB(id, { ...item, completed: !item.completed });
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodos(updatedTasks);
  }

  useEffect(() => {
    console.log("in use effect", todos);
    fetchFromDB().then((newData) => {
      setTodos(newData);
    });
  }, []);

  const addTodo = async () => {
    const newTodo: INewTodo = {
      desc: input,
      completed: false,
    };
    try {
      const newTodoId = await addTodosDB(newTodo);
      if(newTodoId) {
        const todoWithId = { ...newTodo, id: newTodoId }; // Adding the id to the newTodo.
        setTodos([...todos, todoWithId]);
      } else {
        console.log("error id is not defined")
      }
      
    } catch (error) {
      console.error("Failed to add the todo: ", error);
      
    }
  }

  function editTodo(id:string, newDesc: string) {
    const editedTodosList = todos.map((item) => {
      if (id === item.id) {
        updateTodosDB(id, { ...item, desc: newDesc });
        return { ...item, desc: newDesc };
      }
      return item;
    });
    
    setTodos(editedTodosList);
  }

  function deleteTodo(id: string) {
    const remainingTasks = todos.filter((item) => id !== item.id);
    deleteTodoDB(id);
    setTodos(remainingTasks);
  }

  const todosLength = todos.length !== 1 ? "tasks" : "task";
  const numberTodos = `${todos.length} ${todosLength} remaining`;

  return (
    <div>
      <h1>Todolist</h1>
      <h2>{numberTodos}</h2>
      <form onSubmit={handleSubmit}>
        <label>Add a todo...</label>
        <input type="text" onChange={handleChange} value={input} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            id={item.id}
            desc={item.desc}
            completed={item.completed}
            toggleCompleted={toggleCompleted}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
