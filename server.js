const express = require('express');
const cors = require('cors');

require('dotenv').config(); 

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const tasksRoute = require('./routes/tasks');
app.use('/tasks',tasksRoute);

//To start server
const PORT = 3000;

// app.get('/', (req, res)=>{
//     res.send("Hello world!");
// });

app.listen(PORT, ()=> {
    console.log(`Hello server.`);
});