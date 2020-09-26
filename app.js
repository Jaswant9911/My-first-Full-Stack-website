const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("Public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    var fName = req.body.fname
    var lName = req.body.lName
    var eMail = req.body.email

    var data = {
        members: [{
            email_address: eMail,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    };

    const jsonData = JSON.stringify(data)
    const url = "https://us2.api.mailchimp.com/3.0/lists/ee59ddc242"

    var options = {
        method: "POST",
        auth: "jass:a2e110625b851e512b74428698c8ae3c-us2"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            const resData = JSON.parse(data)



        })

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData)
    request.end()


})
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening at port 3000")
})

// List ID
// ee59ddc242

// API Key 
// a2e110625b851e512b74428698c8ae3c-us2