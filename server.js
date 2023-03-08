const express = require("express")
const app =  express()
const port = 3000
const {db, DataTypes} = require("./db")




//import routers
const userRouter = require("./route/users")

app.use("/users", userRouter)



app.listen(port, ()=>{
    db.sync()
    console.log(`Listening on localhost:${port}/`)
})