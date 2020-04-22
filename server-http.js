const http = require("http")

//request handler
const server = http.createServer((req, res) => {
    //request gets info about the incoming request to the server
    //response is used to send information back to the request address

    //there are three things we need to respond with:

    //status code
    res.statusCode = 200;

    //headers 
    //"application/json" is confirming that our content type will be json
    res.setHeader("Content-Type", "application/json")

    //body
    res.write(JSON.stringify({message: "hello world!"}))

    //now send the response off!
    res.end()
});

server.listen(8080, () => {
    console.log("Server started at port 8080")
})
