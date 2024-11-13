const express = require('express'); // Framework for building web applications
const app = express(); // Create an Express app instance
const port = process.env.PORT || 3004; // Port for the server, default to 3004 if not specified
const path = require('path'); // Module to work with file paths
const { open } = require('sqlite'); // SQLite module for database interaction
const sqlite3 = require('sqlite3'); // SQLite driver
const dbPath = path.join(__dirname, "./database.db"); // Path to the database file
const cors = require('cors'); // Middleware to enable CORS

// Middleware to parse JSON and enable CORS
app.use(express.json());


const corsOptions = {
    origin: 'https://oscowl-todo.vercel.app',  // Correctly set the origin without a trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Include credentials like cookies if needed
  };

app.use(cors(corsOptions))

// Database connection variable
let db = null;

// Import UUID generator for unique IDs and bcrypt for hashing passwords
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT for authentication tokens
const { stat } = require('fs'); // Module to get file status (not used in the code)

// Function to initialize the database and start the server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.log(`DB ERROR: ${error.message}`);
        process.exit(1); // Exit the process if database connection fails
    }
};

initializeDBAndServer(); // Call function to start the server

// Basic route to check server status
app.get("/", (request, response) => {
    response.send('Todos backend testing is working... go for different routes');
});

// Route for user signup
app.post("/signup/", async (request, response) => {
    const { username, email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    try {
        // Check if a user with the same username already exists
        const dbUser = await db.get(`SELECT username FROM users WHERE username = '${username}';`);
        if (dbUser) {
            response.status(400).send({ message: "User already exists." });
        } else {
            const userId = uuidv4(); // Generate unique ID
            const currentDate = new Date().toLocaleString(); // Get current date and time
            // Insert the new user into the database
            await db.run(`INSERT INTO users(user_id, username, email, password, created_at) VALUES('${userId}','${username}','${email}','${hashedPassword}','${currentDate}');`);
            response.status(201).send({ message: "User created successfully." });
        }
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        response.status(500).send({ message: "Internal server error." });
    }
});

// Route for user login
app.post("/login/", async (request, response) => {
    const { username, password } = request.body;
    try {
        const dbUser = `SELECT * FROM users WHERE username='${username}';`;
        const checkingUserExists = await db.get(dbUser);
        if (checkingUserExists === undefined) {
            response.status(401).send({ message: 'User Not Found...' });
        } else {
            // Check if the provided password matches the stored hash
            const isValidPassword = await bcrypt.compare(password, checkingUserExists.password);
            if (isValidPassword === true) {
                const payload = { username: username }; // Payload for JWT
                const jwtToken = jwt.sign(payload, 'my_secret_jwt_token'); // Generate JWT token
                response.status(200).send({ jwtToken });
            } else {
                response.status(400).send("Invalid Password");
            }
        }
    } catch (error) {
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Middleware for JWT token verification
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

// Route to get all users (protected by middleware)
app.get('/users/', middleWare, async (request, response) => {
    const query = `SELECT * FROM users;`;
    const users = await db.all(query);
    response.status(200).send(users);
});

// Function to get all todos for a user
const getAllTodosForUser = async (user_id) => {
    const query = `SELECT * FROM todos WHERE user_id = '${user_id}';`;
    return await db.all(query);
};

// Route to create a new todo (protected by middleware)
app.post('/todos/', middleWare, async (request, response) => {
    const userQuery = `SELECT * FROM users WHERE username = '${request.username}';`;
    const user = await db.get(userQuery);

    if (user) {
        const { title, description } = request.body;
        const currentUploadTime = new Date().toLocaleString();
        const todo_id = uuidv4(); // Generate unique ID for the todo
        const insertTodoQuery = `
            INSERT INTO todos (todo_id, user_id, title, description, created_at) 
            VALUES ('${todo_id}', '${user.user_id}', '${title}', '${description}', '${currentUploadTime}');
        `;
        await db.run(insertTodoQuery);

        const updatedTodos = await getAllTodosForUser(user.user_id);
        response.status(200).send({
            message: 'New todo added successfully.',
            todos: updatedTodos
        });
    }
});

// Route to delete a todo (protected by middleware)
app.delete("/todos/", middleWare, async (request, response) => {
    const { todoId } = request.body;
    const userQuery = `SELECT * FROM users WHERE username = '${request.username}';`;
    const user = await db.get(userQuery);

    if (user) {
        const deleteTodoQuery = `DELETE FROM todos WHERE todo_id = '${todoId}' AND user_id = '${user.user_id}';`;
        await db.run(deleteTodoQuery);
        const updatedTodos = await getAllTodosForUser(user.user_id);
        response.status(200).send({
            message: 'Todo deleted successfully.',
            todos: updatedTodos
        });
    }
});

// Route to update a todo (protected by middleware)
app.put('/todos/', middleWare, async (request, response) => {
    const userQuery = `SELECT * FROM users WHERE username = '${request.username}';`;
    const user = await db.get(userQuery);

    if (user) {
        const { todoId, title, description, status } = request.body;
        const todoQuery = `SELECT * FROM todos WHERE todo_id = '${todoId}' AND user_id = '${user.user_id}';`;
        const existingTodo = await db.get(todoQuery);

        if (existingTodo) {
            // Update fields only if provided, otherwise keep existing values
            const updatedTitle = title !== undefined ? title : existingTodo.title;
            const updatedDescription = description !== undefined ? description : existingTodo.description;
            const updatedStatus = status !== undefined ? status : existingTodo.status;
            const currentDate = new Date().toLocaleString();
            const updateTodoQuery = `
                UPDATE todos 
                SET title = '${updatedTitle}', description = '${updatedDescription}', created_at = '${currentDate}', status = '${updatedStatus}'
                WHERE todo_id = '${todoId}' AND user_id = '${user.user_id}';
            `;
            await db.run(updateTodoQuery);

            const updatedTodos = await getAllTodosForUser(user.user_id);
            response.status(200).send({
                message: 'Todo updated successfully.',
                todos: updatedTodos
            });
        } else {
            response.status(404).send({ message: 'Todo not found.' });
        }
    } else {
        response.status(401).send({ message: 'Unauthorized user.' });
    }
});

// Route to get all todos for the logged-in user (protected by middleware)
app.get('/todos/', middleWare, async (request, response) => {
    const userQuery = `SELECT * FROM users WHERE username = '${request.username}';`;
    const user = await db.get(userQuery);

    if (user) {
        const todos = await getAllTodosForUser(user.user_id);
        response.status(200).send({ todos });
    } else {
        response.status(401).send({ message: 'Unauthorized user.' });
    }
});




// Route to update the profile of the logged-in user (protected by middleware)

app.get('/profile',middleWare,async(request,response)=>{

    const userQuery = `SELECT * FROM users WHERE username = '${request.username}';`;
    const user = await db.get(userQuery);
    if(user){
        response.status(200).send(user)
    }else{
        response.status(401).send({message:'Unauthorized user.'})
    }
})

app.put('/profile/', middleWare, async (request, response) => {
    const { username, email, password } = request.body;

    try {
        // Use parameterized query to get user securely
        const userQuery = `SELECT * FROM users WHERE username = ?`;
        const user = await db.get(userQuery, [request.username]);

        if (user) {
            let hashedPassword;
            if(password!==undefined){
                hashedPassword = await bcrypt.hash(password, 10);
            }
            const upDatedUserName = username !== undefined ? username : user.username;
            const upDatedEmail = email !== undefined ? email : user.email;
            const upDatedPassword = password !== undefined ? hashedPassword : user.password;
            const currentDate = new Date().toLocaleString();
            const updateProfileQuery=`
                UPDATE users
                SET username = '${upDatedUserName}', email = '${upDatedEmail}', password='${upDatedPassword}', created_at='${currentDate}'
                WHERE user_id = '${user.user_id}';
            `;
            await db.run(updateProfileQuery);
            response.status(200).json({ message: 'Profile updated successfully' });
        } else {
            response.status(404).send({ message: 'User not found.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Failed to update profile', details: error.message });
    }
});
