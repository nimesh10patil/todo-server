var express=require('express')
var router=express.Router()
var Model=require('../models/db')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt=require('bcrypt-nodejs')

router.post('/register',function(req,res){
    Model.User.findOne({username:req.body.username},function(err,ob){
        if(!ob){
            //new user
            var nuser=new Model.User()
            nuser.username=req.body.username
            var password=req.body.password
            nuser.password=nuser.hashPassword(password)
            nuser.email=req.body.email
            nuser.save(function(err,nu){
                if(err){
                    console.log(err)
                }
                else{
                    res.send(nu)
                }
            })

        }
        else{
            //user exists goto login page
            res.send(ob)
        }
    })
    
})



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Model.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(
    function(username, password, done) {
        Model.User.findOne({username:username},function(err,user){
            if(err){
                return done(err)
            }
            if(user){
                console.log(user.password)

                if(bcrypt.compareSync(password,user.password)){
                    return done(null,user)

                }
                return done(null,false)
 }else
 {
                return done(null,false)

            }
        })


    }
  ));
  
  
 router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    res.send(req.user);
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.send("logout");
  });


  router.get('/isloggedin',function(req,res){
      if(req.user){
        res.send(req.user)

      }else{
          res.send("not logged in")
      }
  })


module.exports=router