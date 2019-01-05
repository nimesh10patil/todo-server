var express=require('express')
var app=express()
var body=require('body-parser')
var path=require('path');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session');
var moment=require('moment')

var user=require('./routes/user')
var task=require('./routes/task')

//middleware for body
app.use(body.json())
app.use(body.urlencoded({extended:true}))

//define folder where angular code lies
app.use(express.static(path.join(__dirname,'dist/loginApp/')))


//passport middlewares

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/user',user)
app.use('/task',task)



app.listen(3000)