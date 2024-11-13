# Todos Application

A simple Todo Application built with React that allows users to log in, sign up, view a homepage, and manage their profile.

## Features

- **Login**: Users can log in to the application.
- **SignUp**: Users can create a new account.
- **Home**: A dashboard for managing and viewing todos.
- **Profile**: Users can view and update their profile information.

## Technologies Used

- **React**: Frontend framework used for building the user interface.
- **React Router**: For handling navigation between different pages (Login, Signup, Home, Profile).
- **JavaScript (ES6+)**: Used for writing the React components and logic.

## Setup and Installation

Follow these steps to set up and run the Todos Application locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)








# Signup Component - Todo Application

This is the `Signup` component for the Todo Application. It handles user registration by allowing users to sign up with an email, username, and password. The component also includes basic form validation, sends a POST request to the backend to create a new user, and redirects the user to the login page after successful sign-up.

## Features

- **Email, Username, and Password Fields**: Users can input their email, username, and password to create a new account.
- **Form Validation**: Ensures that all fields are filled out and the password is at least 8 characters long.
- **Error Handling**: Displays an error message if there are missing fields or if the password is too short.
- **Successful Signup Message**: Displays a success message upon successful signup and redirects the user to the login page after a brief delay.
- **Redirect to Login Page**: Users are redirected to the login page after successful signup.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling navigation between different pages of the application (Signup, Login, etc.).
- **CSS**: For styling the component and using custom CSS for form elements.

## Component Breakdown

### State Management

- `email`: Stores the email input by the user.
- `username`: Stores the username input by the user.
- `password`: Stores the password input by the user.
- `message`: Displays success or error messages based on form submission.
- `error`: A boolean state to track whether there was an error during form submission.

### useNavigate Hook

- `useNavigate()`: React Router hook used to programmatically navigate to the login page after successful signup.

### handleSignup Function

This asynchronous function handles the signup process:

1. **Form Validation**: 
   - Checks if the `email`, `username`, and `password` fields are filled. If any of these fields are empty, an error message is displayed.
   - Ensures the password is at least 8 characters long.

2. **POST Request**:
   - Sends a `POST` request to the backend API (`https://oscowl-todo.onrender.com/signup`) with the user's email, username, and password.
   - The request's body is stringified into JSON format.

3. **Error Handling**:
   - If the form validation fails (fields are empty or password is too short), an error message is displayed.
   - If the signup is successful, a success message is shown, and the user is redirected to the login page after a 5-second delay.

### JSX Structure

- **Container**: A wrapper for the form.
- **FormWrapper**: A styled wrapper for the form elements, including the input fields and the submit button.
- **Title**: Displays the heading "Create an Account".
- **Input Fields**: Three input fields for email, username, and password.
- **Button**: A submit button that triggers the `handleSignup` function.
- **Message**: A message element that conditionally displays success or error messages based on the form submission result.
- **Link**: A link to the login page for users who already have an account.

## How to Use

To use the `Signup` component in your application, follow these steps:

1. **Import the Component**:

   ```javascript
   import Signup from './components/Signup';




# Login Component - Todo Application

The `Login` component is used for user authentication in the Todo Application. It allows users to log in to their accounts using a username and password. Upon successful login, a JWT token is stored in cookies for authentication in future requests. If the login is unsuccessful, an error message is displayed.

## Features

- **Username and Password Fields**: Users can enter their username and password to log in.
- **Form Validation**: Displays an error message if the login credentials are incorrect.
- **JWT Token Storage**: On successful login, a JWT token is stored in cookies for session management.
- **Redirect to Home**: After a successful login, the user is redirected to the homepage after a brief delay.
- **Link to Signup**: Provides a link to the signup page for users who do not have an account.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling navigation between different pages (login, signup, home, etc.).
- **Cookies**: The `js-cookie` library is used to store the JWT token in the user's browser.
- **CSS**: Custom CSS for styling the component and form elements.

## Component Breakdown

### State Management

- `username`: Stores the username input by the user.
- `password`: Stores the password input by the user.
- `errorMsg`: Stores error messages for invalid login attempts.

### useNavigate Hook

- `useNavigate()`: React Router hook used to navigate to the home page (`/`) after successful login.

### handleLogin Function

This asynchronous function handles the login process:

1. **Login Request**:
   - Sends a `POST` request to the backend API (`https://oscowl-todo.onrender.com/login`) with the user's `username` and `password`.
   - The request's body is stringified into JSON format.

2. **Response Handling**:
   - If the login is successful (HTTP status `200 OK`), the JWT token returned by the backend is stored in cookies using the `Cookies.set()` method. The token is set to expire in 30 days.
   - A success message is displayed, and the user is redirected to the homepage after a 5-second delay.
   - If the login fails (invalid credentials), an error message is shown, prompting the user to enter valid credentials.

3. **Error Handling**:
   - Displays an error message if there are issues during the login process, such as incorrect credentials or network errors.

### JSX Structure

- **Container**: A wrapper element for the form.
- **FormWrapper**: A styled wrapper for the form elements, including the input fields and the submit button.
- **Title**: Displays the heading "Login to Your Account".
- **Input Fields**: Two input fields for `username` and `password`.
- **Button**: A submit button that triggers the `handleLogin` function.
- **Error Message**: Displays any error messages related to login failure.
- **Link**: A link to the signup page for users who do not have an account yet.

## How to Use

To use the `Login` component in your application, follow these steps:

1. **Import the Component**:

   ```javascript
   import Login from './components/Login';






### Todo Application - Home Component
This React component represents the home page of a Todo application. It allows users to view, add, edit, and update their todo tasks. The component is designed for users who are authenticated, using JWT tokens stored in cookies. If the user is not logged in, they are redirected to the login page.

### Features:
### Display Todo List: Shows all the todos fetched from the server.
### Add Todo: Allows users to add new todo tasks with title and description.
### Edit Todo: Allows users to edit an existing todo task.
### Update Todo: Updates a todo's title, description, and status.
### Authentication Check: Redirects the user to the login page if they are not authenticated.
### Profile Link: Provides a link to the user's profile.

### File Overview
The component is built using React class components and manages state using this.state. It also makes use of lifecycle methods like componentDidMount to fetch data when the component is mounted.

### Imports
React: React library is imported to build the component.
Cookies: Used to manage JWT token stored in cookies for authentication.
Navigate and Link: From react-router-dom, used for navigation and routing.
TodoItem: A custom component that displays individual todo items.
Icons: TbCheckupList and CgProfile are imported from react-icons to display icons.


### State Variables:
todos: Array to store fetched todos from the API.
todoTitle: String to store the title of a new or edited todo.
todoDescription: String to store the description of a new or edited todo.
message: String to store status messages for operations like adding, editing, or fetching todos.
user: Stores the JWT token retrieved from cookies.
showEditPopup: Boolean to control the visibility of the edit todo popup.
editTodo: Stores the todo that is being edited.
editStatus: String to store the current status of the todo during editing (Pending, InProgress, Completed).
redirectToLogin: Boolean to trigger a redirect to the login page if the user is not authenticated.

### Component Lifecycle:
componentDidMount: This method is called when the component is mounted. It checks if the user is authenticated by checking the jwtToken cookie. If the token is not found, the user is redirected to the login page. Otherwise, it fetches the user's todos.

fetchTodos: An asynchronous method to fetch the todos from the API using the JWT token in the authorization header. If successful, it updates the todos state; otherwise, it displays an error message.

### Handlers:
handleAddTodo: Adds a new todo by sending a POST request to the backend. If the fields (title and description) are not filled, it displays an error message. Otherwise, it adds the todo and refreshes the todo list by calling fetchTodos.

handleEdit: Opens the edit popup when a user clicks on the edit button for a todo. It populates the form fields with the todo's existing data.

handleUpdateTodo: Sends a PUT request to update the todo's title, description, and status. After updating, it refreshes the todo list and closes the edit popup.

handleChange: Updates the state variables for title, description, and status based on user input in the form.

closeEditPopup: Closes the edit popup without making changes.

### Render Method:
Redirect: If the user is not authenticated, it redirects them to the login page using the Navigate component from react-router-dom.

Todo Input: The form fields allow the user to enter a title and description for a new todo. The user can then click the "Add Todo" button to submit the form.

Todo List: Displays a list of todos fetched from the server. If there are no todos, a message is shown. Each todo is rendered using the TodoItem component.

### Edit Popup: If the showEditPopup state is true, a popup is displayed with input fields to edit the todo's title, description, and status. The user can update the todo or close the popup.




## Profile Component README
This project is a simple Profile Management system where users can view and update their profile information. It includes a modal popup that allows users to update their profile details such as username, email, and password. It leverages JWT (JSON Web Token) authentication to securely fetch and update user data.

### Table of Contents
Overview
Features
Getting Started
File Structure
Technologies Used
Usage
# Overview
The Profile component provides users with the ability to:

View their profile information (username, email, and password).
Update their profile information (username, email, and password).
Access other sections of the application via a navigation link.
The component retrieves user data using the JWT token stored in cookies. If the token is missing, the user is prompted to log in. The data is fetched from a backend server and displayed to the user in a user-friendly format.

# Features
View Profile: Displays the current username, email, and a masked password for security.
# Update Profile: Allows users to update their username, email, and password through an interactive form.
JWT Authentication: The profile data is fetched securely using a JWT token stored in the browser's cookies.
Loading & Error States: Shows a loading spinner while fetching data, and handles any errors with an error message.
# Modal for Profile Update: The profile update form is displayed in a modal overlay, which can be canceled or submitted.
# Navigation: Provides a link to navigate back to the home page.