//Include Everything
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

//Setup express and add a JSON parser to it in order to handle JSON Objects
var app = express();
var jsonParser = bodyParser.json({
    extended: false
})
app.use(express.static('public'));
app.use(cors());
app.use(jsonParser);

//Setup Mongoose
var url = "mongodb://localhost:27017/";
var usersSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    birthDate: String,
    username: String,
    password: String,
    email: String
})
var User = mongoose.model("User", usersSchema);

//Add a POST request handler to express to handle login
app.post('/users/login', async function (req, res) {
    //Parse properties from body
    var un = req.body.username;
    var pass = req.body.password;
    await mongoose.connect('mongodb://localhost:27017/AlljsPOCDB', { useNewUrlParser: true });
    let user = await User.findOne({ username: un, password: pass });
    if (user === null) {
        res.status(404);
        res.send({
            errorCode: 404,
            errorMessage: "Username or Password wrong!"
        });
        res.end();
    } else {
        res.send({
            username: user.username,
            email: user.email
        });
        res.end();
    }
    await mongoose.disconnect();
    console.log(user);
}); //End of CallBack Hell


app.post('/users/signup', async function (req, res) {

    var user = {
        firstname: req.body.firstname,
        birthdate: req.body.birthdate,
        email: req.body.email,
        username: req.body.firstname,
        password: req.body.password,
    };

    await mongoose.connect('mongodb://localhost:27017/AlljsPOCDB', { useNewUrlParser: true });
    let result = await User.create(user);

    if (result.length === 0) {
        res.status(404);
        res.send({
            errorCode: 404,
            errorMessage: "Something went wrong, try again!"
        });
        res.end();
    } else {
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            insertedId: result._id,
            ok: 'OK!'
        });
        res.end();
    }
    await mongoose.disconnect();
});

var server = app.listen(9090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
