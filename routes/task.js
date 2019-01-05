var express=require('express')
var router=express.Router()
var Model=require('../models/db')

router.post('/add',function(req,res){
    Model.Task.findOne({title:req.body.title},function(err,ob){
        if(ob){
            //task exists 

            res.send(ob)
        }else{
            //create new task
            console.log(req.user._id)
            var ntask=new Model.Task()
            ntask.title=req.body.title
            ntask.description=req.body.description
            
            Model.Task.count({userid:req.user._id}, function( err, count){
                console.log( "Number of users:", count );
            ntask.priority=count+1
            ntask.userid=req.user._id
            ntask.assignedto=req.user._id
            ntask.save(function(err,ob){
                
                console.log("error")

            res.send(ob)
            })
            })
            


        }
    })
})



router.get('/get',function(req,res){
    Model.Task.find({userid:req.user._id},function(err,ob){
        if(err){
            console.log(err)
        }
        res.send(ob)
    }).sort({priority:1})
})

router.put('/edit/:id',function(req,res){
    Model.Task.findOne({userid:req.user._id},function(err,ob){

        

})
})


module.exports=router