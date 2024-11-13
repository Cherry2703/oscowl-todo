### Todo Web Application Backend
This is the backend of a Todo Web Application built using Node.js, Express.js, SQLite, JWT Authentication, and UUID for unique identifiers. The backend handles user authentication, task management (CRUD operations), and secure user data using JWT tokens.

### Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js, making it easy to set up API routes.
SQLite: Lightweight SQL database for storing user and todo data.
JWT (JSON Web Tokens): For user authentication and session management.
UUID: For generating unique identifiers for users and todos.
bcrypt: For hashing and verifying passwords securely.
CORS: Middleware to handle cross-origin resource sharing.


### API Endpoints
The backend provides the following API endpoints:

### 1. User Signup

Endpoint: POST /signup/
Request body:
json
Copy code
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}

Description: Registers a new user. If the user already exists, it returns a 400 status with the message User already exists..
Response:json

{
  "message": "User created successfully."
}



### 2. User Login

Endpoint: POST /login/
Request body:json

{
  "username": "newuser",
  "password": "password123"
}
Description: Logs in a user by verifying the username and password. If valid, a JWT token is generated and returned.
Response:json

{
  "jwtToken": "<jwt-token>"
}


### 3. Get All Users (Protected)

Endpoint: GET /users/
Description: Fetches all users. This route is protected by JWT authentication, and you must provide a valid JWT token in the Authorization header.
Response:json

[
  {
    "user_id": "uuid",
    "username": "newuser",
    "email": "user@example.com",
    "created_at": "date-time"
  }
]

### 4. Create a New Todo (Protected)

Endpoint: POST /todos/
Request body:json

{
  "title": "Finish homework",
  "description": "Complete the math assignment."
}

Description: Adds a new todo task. This route is protected by JWT authentication, and you must provide a valid JWT token in the Authorization header.
Response:json

{
  "message": "New todo added successfully.",
  "todos": [
    {
      "todo_id": "uuid",
      "title": "Finish homework",
      "description": "Complete the math assignment.",
      "created_at": "date-time",
      "status": "pending"
    }
  ]
}


### 5. Get All Todos (Protected)

Endpoint: GET /todos/
Description: Fetches all todos for the authenticated user. This route is protected by JWT authentication.
Response:json

{
  "todos": [
    {
      "todo_id": "uuid",
      "title": "Finish homework",
      "description": "Complete the math assignment.",
      "created_at": "date-time",
      "status": "pending"
    }
  ]
}


### 6. Update Todo (Protected)

Endpoint: PUT /todos/
Request body:json
{
  "todoId": "uuid",
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
Description: Updates an existing todo. The todo will be updated based on the provided fields (title, description, status). This route is protected by JWT authentication.
Response:json

{
  "message": "Todo updated successfully.",
  "todos": [
    {
      "todo_id": "uuid",
      "title": "Updated title",
      "description": "Updated description",
      "created_at": "date-time",
      "status": "completed"
    }
  ]
}


### 7. Delete Todo (Protected)

Endpoint: DELETE /todos/
Request body:json
{
  "todoId": "uuid"
}
Description: Deletes a todo by its todoId. This route is protected by JWT authentication.
Response:json
{
  "message": "Todo deleted successfully.",
  "todos": [
    {
      "todo_id": "uuid",
      "title": "Remaining todo",
      "description": "Description of the remaining task.",
      "created_at": "date-time",
      "status": "pending"
    }
  ]
}


### 8. Update User Profile (Protected)

Endpoint: PUT /profile/
Request body:json

{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
Description: Allows the user to update their profile details such as username, email, and password. This route is protected by JWT authentication.
Response:json

{
  "message": "Profile updated successfully."
}


### JWT Authentication
What is JWT?
JWT (JSON Web Token) is used for securely transmitting information between the server and the client. In this application, JWT is used to authenticate users and protect routes that require user data.

How it works:
When a user logs in, they receive a JWT token.
The token must be included in the Authorization header in subsequent requests to protected routes.
The server verifies the token and grants access to protected resources.
Sample JWT Header:
makefile
Copy code
Authorization: Bearer <jwt-token>

### Middleware
JWT Authentication Middleware: Protects routes by verifying the presence and validity of the JWT token. If the token is invalid or missing, the request is denied with a 401 Unauthorized error.
js

const middleWare = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers['authorization'];
    if (authHeader) {
        jwtToken = authHeader.split(' ')[1]; // Extract token from header
    }
    if (jwtToken) {
        jwt.verify(jwtToken, 'my_secret_jwt_token', async (error, payload) => {
            if (error) {
                response.status(401).send({ message: 'Invalid Token' });
            } else {
                request.username = payload.username; // Attach username to request object
                next();
            }
        });
    } else {
        response.status(401).send({ message: 'Invalid Token' });
    }
};


### Database Schema
Users Table:


CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT
);


Todos Table:

CREATE TABLE todos (
    todo_id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


### Security Considerations
Password Hashing: Passwords are hashed using bcrypt before being stored in the database to protect user data.
JWT Tokens: Tokens are used to maintain session state in a secure manner, with a secret key used to sign them.
Error Handling
The application returns appropriate status codes and error messages in case of failure:

400 Bad Request: Invalid input or request.
401 Unauthorized: Missing or invalid authentication token.
404 Not Found: Resource (e.g., todo) not found.
500 Internal Server Error: Server or database issue.