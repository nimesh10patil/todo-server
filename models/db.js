var mongoose=require('mongoose')
var bcrypt=require('bcrypt-nodejs');
var moment=require('moment')

mongoose.connect('mongodb://localhost/todo')

//usersdb

var userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    }
})


userSchema.methods.hashPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
  }
  
userSchema.methods.comparepassword=function(password,hash){
   return bcrypt.compareSync(password,hash)
  }

var User=mongoose.model('users',userSchema)


//tasks db


var taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:Number,
        required:true
    },

    adminid:{
        type:String
    },
    userid:{
        type:String
    },
    assignedto:{
        type:String
    }
})

var Task=mongoose.model('tasks',taskSchema)

//colab

var colabSchema=new mongoose.Schema({
    users:[String]
})
var Colab=new mongoose.model('colabs',colabSchema)

module.exports={
    User:User,
    Task:Task,
    Colab:Colab
}

