import React, {useState} from "react";
import "../App.css";

function TodoCreate({onCreateTodo}) {
  const [newTodo, setNewTodo] = useState("");
  const inputClear = () => {
    setNewTodo("");
  };
  const createTodo = () => {
    if (!newTodo) return;

    const request = {
      id: Math.floor(Math.random() * 99999999999),
      content: newTodo,
    };
    onCreateTodo(request);
    inputClear();
  };
  return (
    <div className="todo-create-main">
      <input
        className="todo-create-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        type="text"
        placeholder="Enter todo..."
      />
      <button onClick={createTodo} className="todo-create-button">
        Create Todo
      </button>
    </div>
  );
}

export default TodoCreate;
