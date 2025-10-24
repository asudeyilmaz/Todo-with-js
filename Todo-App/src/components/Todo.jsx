import React, {useState} from "react";
import {IoMdRemoveCircle} from "react-icons/io";
import {FaEdit} from "react-icons/fa";
import "../App.css";
import {FaCheck} from "react-icons/fa";

function Todo({todo, onRemoveTodo, onUpdateTodo}) {
  const {id, content} = todo;

  const [editable, setEditable] = useState(false);
  const [editTodo, setEditTodo] = useState(content);

  const removeTodo = () => {
    onRemoveTodo(id);
  };
  const updateTodo = () => {
    const request = {
      id: id,
      content: editTodo,
    };
    onUpdateTodo(request);
    setEditable(false);
  };
  return (
    <div className="todo-wrapper">
      <div>
        {editable ? (
          <input
            style={{width: "380px"}}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todo-create-input"
            type="text"
          />
        ) : (
          content
        )}
      </div>
      <div>
        <IoMdRemoveCircle className="todo-icons" onClick={removeTodo} />
        {editable ? (
          <FaCheck className="todo-icons" onClick={updateTodo} />
        ) : (
          <FaEdit className="todo-icons" onClick={() => setEditable(true)} />
        )}
      </div>
    </div>
  );
}

export default Todo;
