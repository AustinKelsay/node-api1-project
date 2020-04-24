const express = require("express")
const db = require("./database")

//creates our server instance
const server = express() 

// Allows our API to parse request bodies that are JSON into usable objects
server.use(express.json())

//express comes with routing unlike raw http so we can define how our server will respond based on the endpoint
//Here we define our route before we deal with any req/res
server.get("/", (req, res) => {
    res.json({ message: "hello world" })
})

server.get("/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if(user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "user not found",
        })
    }
})

server.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Need a user name"
        })
    }
    const newUser = db.createUser({
        id: 4,
        name: req.body.name,
    })
    //status 201 is for confirming post success
    res.status(201).json(newUser)

})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if(user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name
        })

        res.json(updatedUser);
    } else {
        res.status(404).json({
            message: "user not found",
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        //204 is a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "user not found",
        })
    }
})

server.listen(6969, () => {
    console.log("Server started at port 6969")
})