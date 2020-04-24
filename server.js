const express = require("express")
const db = require("./database")
const cors = require("cors")

//creates our server instance
const server = express() 

// Allows our API to parse request bodies that are JSON into usable objects
server.use(express.json())
server.use(cors())

//express comes with routing unlike raw http so we can define how our server will respond based on the endpoint
//Here we define our route before we deal with any req/res
server.get("/", (req, res) => {
    res.json({ message: "hello world" })
})

server.get("/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    }
})

server.get("/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if(user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.post("/users", (req, res) => {
    if (!req.body.name && req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
    const newUser = db.createUser({
        id: 4,
        name: req.body.name,
        bio: req.body.bio
    })
    //status 201 is for confirming post success
    res.status(201).json(newUser)

})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if(user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })

        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
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