var path = require('path');
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const dummy = require('./Controllers/dummydata');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const app = express()
app.use(morgan("common"))
app.use(helmet());
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Dummy data
app.get('/GET', dummy.get)
app.post('/POST', dummy.post)
app.get('/GET/:id', dummy.getid)
app.put('/PUT/:id', dummy.put)
app.delete('/DELETE/:id', dummy.remove)

app.listen(4000, () => {
	console.log("Server running on port 4000");
});