const express = require ("express");
const bodyParser =  require ("body-parser");
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const cors = require('cors');

const register = require("./endPoint/register")
const signIn = require ("./endPoint/signin")
const profile = require ("./endPoint/profile")
const entries = require ("./endPoint/entries")

var knex = require('knex');

const serverPostgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'GRis17HU',
      database : 'facedatabase'
    }
    
  });



  const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req,res)=>{res.send("labas")});

app.post("/signin",(req,res)=>{signIn.handleSignin(req,res,serverPostgres,bcrypt)});

app.post("/register",(req,res)=>{register.handleRegister(req,res,serverPostgres,bcrypt,saltRounds)});
    
app.get("/profile/:id",(req,res)=>{profile.handleProfileGet(req,res,serverPostgres)})

app.put ("/image",(req,res)=> {entries.entriesHandle(req,res, serverPostgres)});

app.post ("/imageurl",(req,res)=> {entries.handleApi(req,res)})

app.listen (process.env.PORT ||3000, ()=>{
  console.log(`server is running on port ${process.env.PORT}`)})