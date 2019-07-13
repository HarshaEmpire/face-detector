const express=require("express");
const app=express();
const bcrypt=require("bcrypt-nodejs");
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(cors())
const knex=require('knex')
const register=require('./controller/register');
const signin=require("./controller/signin")
const profile=require("./controller/profile");
const image=require("./controller/image");
const deletes=require("./controller/deletes");

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'user',
    database : 'smart'
  }
});



app.get('/',(req,res)=>{
	res.json(db.user);
});

app.post('/delete',(req,res)=>{deletes.deleteHandler(req,res,db)})
app.post('/signin',(req,res)=>{signin.signinHandler(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})

app.listen(3000,()=>{
	console.log("running port 3000");
});
