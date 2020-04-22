const express = require("express")

//creates our server instance
const server = express() 

//express comes with routing unlike raw http so we can define how our server will respond based on the endpoint
//Here we define our route before we deal with any req/res
server.get("/", (req, res) => {
    res.json({ message: "hello world" })
})

server.listen(6969, () => {
    console.log("Server started at port 6969")
})