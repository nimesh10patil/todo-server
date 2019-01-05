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
            
            ntask.priority=req.body.priority
            ntask.userid=req.user._id
            ntask.assignedto=req.user._id
            ntask.save(function(err,ob){
                
                console.log("error")

            res.send(ob)
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
    Model.Task.findById(req.params.id,function(err,ob){
        ob.title=req.body.title
        ob.description=req.body.description
        ob.priority=req.body.priority
        ob.save(function(errx,obx){
            res.send(obx)
        })

})
})

router.delete('/delete/:id',function(req,res){
    Model.Task.findByIdAndDelete(req.params.id,function(err,ob){
res.send(ob)   

})
})


module.exports=router