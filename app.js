const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    
    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/cf2ef1bd9e",
        method: "POST",
        headers: {
            "Authorization": "Budi721 44f245af17e88af98aea91bc8e17f5b8-us4"
        },
        body: jsonData
    }

    request(options, function(error, response, data){
        if(error || response.statusCode == 400) {
            res.sendFile(__dirname + "/failure.html")
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
})

