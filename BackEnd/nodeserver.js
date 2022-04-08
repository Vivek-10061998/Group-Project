const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const checkAuth=require("./middleware/check-auth");
const path = require('path')


const homeController=require("./controllers/homecontroller");

const usercontroller=require('./controllers/usercontroller');


const { append } = require('express/lib/response');
const mongoose = require('mongoose');
const dbURL = "mongodb://127.0.0.1:27017/IndiaMart_db";
mongoose.Promise=global.Promise;
const req = require("express/lib/request");
//Set up the connection the database
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true});
//assign the database to a variable 
const db = mongoose.connection;
db.once("open",()=> console.log("Successfully connected to the mongoDB using Mongoose!"));
module.exports=db;
const port =process.env.PORT||3000;

app.get('/',homeController.respondWithWelcome);

app.use('/api',usercontroller);

app.listen(port,()=>{console.log(`Running on port ${port}`)});