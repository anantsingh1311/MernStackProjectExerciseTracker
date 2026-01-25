/*
Setting ub Backend Server page for your react app
*/
// Require all the things to handle for the backend of the server
const express = require('express')
const cors = require('cors')
//to connect to our MongoDB database:
const mongoose = require('mongoose');

//this configures how we can have our env variables in .env file
require('dotenv').config();

//configuring our express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
// allow us to parse json because our server will be sending and recieving data in the form of json
app.use(express.json());

//To connect to our MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established sucessfully") });

//use the routes created here in server file of backend
const excerciseRouter = require('./routes/excercise');
const userRouter = require('./routes/user');

app.use('/exercise', excerciseRouter);
app.use('/user', userRouter);

//this app starts the server on listening on the port specified above
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});