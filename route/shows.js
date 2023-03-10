const { response, request } = require("express")
const express = require("express")
const router = express.Router()
//import User tables
const {Show, User} = require("../models/index")
const {check, validationResult} = require("express-validator")

//GET method, get all shows
router.get("/", async(request, response)=>{
    response.json(await Show.findAll())
     //console.log(Object.keys(User.prototype));
})
//GET method, get one show
router.get("/:id", async(request, response)=>{
    response.json(await Show.findByPk(request.params.id))
})
//GET methods, shows of particular genre
router.get("/genre/:id", async(request, response)=>{
    try{
        const data = await Show.findAll({
            where:{
              genre: request.params.id
            }
        })
        response.json(data)
    }catch(err){
        response.json(`Error: ${err} `)
    }
    
})
//middleware
router.use(express.json())

//PUT method, update the status of a show
router.put("/:id",[check("status").not().isEmpty().trim().isLength({ min: 5, max:25 })] ,async(request, response)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        response.json({error: errors.array()})
    }else{
        //PK used to get row to update
        const primaryKey = request.params.id
        //new value used to update current status
        const data = request.body.status;

        await Show.update({
            status: data},{
                where: {id : primaryKey}
        })   
    }
    
    
})
//PUT method, update rating of a show that has been watched
router.put("/rating/:id", [check("rating").not().isEmpty().trim()],async(request, response)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        response.json({error: errors.array()})
    }else{
        const primaryKey = request.params.id
        const newRating = request.body.rating //new rating from request body 
        const show = await Show.findByPk(primaryKey)
        //if show userId null, don't update rating
        if(show.userId == null){
            response.json("This show has not been watched by a user")
        }else{
            await Show.update({
                rating: newRating},{
                    where: {id: primaryKey}
                }
            )
        }
        }    
})


//DELETE method, delete a show/row
router.delete("/:id", async(request, response)=>{
    const primaryKey = request.params.id
    await Show.destroy({
        where: {id: primaryKey}
    })
})



module.exports = router;