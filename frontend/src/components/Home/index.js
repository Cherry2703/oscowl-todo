
import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Navigate,Link } from "react-router-dom";
import TodoItem from "../TodoItem";

import { TbCheckupList } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";



import "./index.css";

class Home extends Component {
  state = {
    todos: [],
    todoTitle: "",
    todoDescription: "",
    message: "",
    user: Cookies.get('jwtToken'),
    showEditPopup: false,
    editTodo: null,
    editStatus: "Pending",
    redirectToLogin: false
  };

  componentDidMount() {
    if (!this.state.user) {
      this.setState({ redirectToLogin: true });
      return;
    }
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const response = await fetch('https://oscowl-todo.onrender.com/todos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.user}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ todos: data.todos });
      } else {
        this.setState({ message: 'Failed to fetch todos.' });
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      this.setState({ message: 'An error occurred while fetching todos.' });
    }
  };



  handleDeleteTodo = async (todoId) => {
    const { user } = this.state;
  
    try {
      const response = await fetch(`https://oscowl-todo.onrender.com/todos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({todoId:todoId})
      });
  
      if (response.ok) {
        this.setState({ message: 'Todo deleted successfully!' });
        this.fetchTodos(); // Refresh the todo list after deletion
      } else {
        this.setState({ message: 'Failed to delete todo.' });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      this.setState({ message: 'An error occurred while deleting the todo.' });
    }
  };

  handleAddTodo = async () => {
    const { todoTitle, todoDescription, user } = this.state;

    if (!todoTitle || !todoDescription) {
      this.setState({ message: 'Title and Description are required.' });
      return;
    }

    try {
      const response = await fetch('https://oscowl-todo.onrender.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`
        },
        body: JSON.stringify({
          title: todoTitle,
          description: todoDescription,
          status: 'Pending'
        })
      });

      if (response.ok) {
        this.setState({ message: 'Todo added successfully!', todoTitle: '', todoDescription: '' });
        this.fetchTodos(); // Refresh the list after adding
      } else {
        this.setState({ message: 'Failed to add todo.' });
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      this.setState({ message: 'An error occurred while adding the todo.' });
    }
  };

  handleEdit = (todo) => {
    this.setState({
      showEditPopup: true,
      editTodo: todo,
      todoTitle: todo.title,
      todoDescription: todo.description,
      editStatus: todo.status || "Pending"
    });
  };

  handleUpdateTodo = async () => {
    const { editTodo, todoTitle, todoDescription, editStatus, user } = this.state;
    try {
      const response = await fetch(`https://oscowl-todo.onrender.com/todos/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          todoId: editTodo.todo_id,
          title: todoTitle,
          description: todoDescription,
          status: editStatus
        })
      });

      if (response.ok) {
        this.setState({ message: "Todo updated successfully!", showEditPopup: false, todoDescription: '', todoTitle: '' });
        this.fetchTodos(); // Refresh the list
      } else {
        this.setState({ message: "Failed to update todo." });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      this.setState({ message: 'An error occurred while updating the todo.' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeEditPopup = () => {
    this.setState({ showEditPopup: false });
  };

  render() {
    const { todos, todoTitle, todoDescription, showEditPopup, editStatus, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="todo-container">
        <div className="header-and-profile-cont">
            <h1 className="todo-header">Todo Application</h1>
            <Link to='/profile' className="profile-icon-home-page"><span><CgProfile/></span></Link>
        </div>

        <div className="todo-input">
          <input
            type="text"
            name="todoTitle"
            value={todoTitle}
            onChange={this.handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="todoDescription"
            value={todoDescription}
            onChange={this.handleChange}
            placeholder="Description"
          />
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>

        <div className="todo-list-container">
          {todos.length === 0 ? (
            <div className="no-todos-message">
                <span className="checkup-list-icon"><TbCheckupList/></span>
              <p>There is nothing to show. Please add a todo.</p>
            </div>
          ) : (
            <ul className="todo-list">
              <span className="todo-header">My Todo's List</span>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.todo_id}
                  todo={todo}
                  onDelete={this.handleDeleteTodo}
                  onEdit={this.handleEdit}
                />
              ))}
            </ul>
          )}
        </div>

        {showEditPopup && (
          <div className="popup-form">
            <div className="form-content">
              <h2>Edit Todo</h2>
              <label>Title:</label>
              <input
                type="text"
                name="todoTitle"
                value={todoTitle}
                onChange={this.handleChange}
              />
              <label>Description:</label>
              <input
                type="text"
                name="todoDescription"
                value={todoDescription}
                onChange={this.handleChange}
              />
              <label>Status:</label>
              <select
                name="editStatus"
                value={editStatus}
                onChange={this.handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={this.handleUpdateTodo}>Update</button>
              <button onClick={this.closeEditPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;











