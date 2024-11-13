import React from "react";

import { MdDeleteOutline ,MdEdit} from "react-icons/md";



import './index.css'

const TodoItem = ({ todo, onDelete, onEdit }) => {
    
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span >{todo.title}</span>
      <span>{todo.description}</span>
      <div>
        <button className="edit-btn" onClick={() => onEdit(todo)}>
            <MdEdit/>
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.todo_id)}>
            <MdDeleteOutline/>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
