const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config(); 

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Database connection
// mongoose.connect(process.env.MONGO_DB_URL)
// .then(() => console.log('MongoDB CONNECTED.'))
// .catch(err => console.log(err));

//Routes
//app.use('/api/items', require('./routes/items'));//to get all items from created api in Postman

//To start server
PORT = 3000;

app.get('/', (req, res)=>{
    res.send("Hello world!");
});

app.listen(PORT, ()=> {
    console.log(`Hello server.`);
});