const express = require("express")
const router =  express.Router()
//import User tables
const {User} = require("../models/User")
const {Show} = require("../models/Show")
//express input validation
const {check, validationResult} = require("express-validator")

//doesnt belong
Show.belongsTo(User)
User.hasMany(Show)




//GET method, get all users in db
router.get("/", async(request, response)=>{
    let allUsers = await User.findAll()
    response.json(allUsers)


})
//GET method get specific user in db
router.get("/:id", async(request, response)=>{
    let index = request.params.id;
    let user = await User.findByPk(index) //test
    response.json(await User.findByPk(index))
    ///
    //console.log(Object.keys(User.prototype));
    console.log(await user.getShows(index))
})


module.exports = router;