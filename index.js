//Include Everything
var mongo = require('mongodb').MongoClient;;
var express = require('express');
var bodyParser = require('body-parser');

//Setup express and add a JSON parser to it in order to handle JSON Objects
var app = express();
var jsonParser = bodyParser.json({
    extended: false
})
app.use(express.static('public'));
app.use(jsonParser);

//Add a POST request handler to express to handle login
var url = "mongodb://localhost:27017/";
app.post('/users/login', function (req, res) {
    //Parse properties from body
    var un = req.body.username;
    var pass = req.body.password;

    //Connect to DB
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AlljsPOCDB");
        var query = {
            username: un,
            password: pass
        };

        //Find User
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;

            if (result.length === 0) {
                res.status(404);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    errorCode: 404,
                    errorMessage: "Username or Password wrong!"
                }));
                res.end();
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send({
                    username: result[0].username,
                    email: result[0].email
                });
                res.end();
            }
            db.close();
        });
    });
}); //End of CallBack Hell

var server = app.listen(9090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})