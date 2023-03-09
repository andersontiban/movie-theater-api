const express = require("express")
const router =  express.Router()
//import User tables
const {Show, User} = require("../models/index")

//express input validation
const {check, validationResult} = require("express-validator")


//GET method, get all users in db
router.get("/", async(request, response)=>{
    let allUsers = await User.findAll()
    response.json(allUsers)


})
//GET method, get specific user in db
router.get("/:id", async(request, response)=>{
    const primaryKey = request.params.id;
    response.json(await User.findByPk(primaryKey));
})


//GET method, get shows watched by a user
router.get("/shows/:id", async(request, response)=>{
    const primaryKey = request.params.id;
    const user = await User.findByPk(primaryKey) //test
    //console.log(Object.keys(User.prototype));
    response.json(await user.getShows(primaryKey))

})

//PUT method, add show if user has watched it 
router.put("/:id", async(request, response)=>{        //needs to be completed
    const primaryKey = request.params.id;
    //await Show.
})




module.exports = router;