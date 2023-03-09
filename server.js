const express = require("express")
const app =  express()
const port = 3000
const {db, DataTypes} = require("./db")




//import routers
const userRouter = require("./route/users")
const showRouter = require("./route/shows")

app.use("/users", userRouter)
app.use("/shows", showRouter)



app.listen(port, ()=>{
    db.sync()
    console.log(`Listening on localhost:${port}/`)
})