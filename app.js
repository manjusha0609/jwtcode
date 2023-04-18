//import {login, profile} from './script'
let express=require('express')
let app=express()
app.listen(3000)
console.log("server started")
let jwt=require('jsonwebtoken')
app.post('/login',(req,res)=>{
    const user={
        username:'cvr',
        password:'cse'
    }
    jwt.sign({user},"secret key",(err,token)=>{
        if(!err){
            res.json({token})
        }
    })
})
function accessToken(req,res,next){  
    let bearerHeader=req.headers['authorization']
    if(typeof(bearerHeader!=='undefined')){
        let bearerToken=bearerHeader.split(" ")[1]
        console.log(bearerToken)
        req.token=bearerToken;
        next();
    }
    else{
        res.json({
            message:"no header exits"
        })
    }
}
app.post('/profile',accessToken,(req,res)=>{
    jwt.verify(req.token,"secret key",(err)=>{
        if(!err)
        res.json({message:"profile End point"})
        else
        res.json(err)
        //res.json({message:"Invalid Token"})
    })
})