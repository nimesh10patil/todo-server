var express=require('express')
var router=express.Router()
var Model=require('../models/db')

router.get('/get',function(req,res){
    res.send("!!!")
})

module.exports=router