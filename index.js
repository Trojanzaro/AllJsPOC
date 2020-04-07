//Include Everything
var mongo = require('mongodb').MongoClient;
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

var User =  mongoose.model("User", usersSchema);

//Add a POST request handler to express to handle login
app.post('/users/login', async function (req, res) {
    //Parse properties from body
    var un = req.body.username;
    var pass = req.body.password;
    await mongoose.connect('mongodb://localhost:27017/AlljsPOCDB', { useNewUrlParser: true });
    let user = await User.findOne({username: un, password: pass});
    if (user === null) {
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
            username: user.username,
            email: user.email
        });
        res.end();
    }
    await mongoose.disconnect();
    console.log(user);
}); //End of CallBack Hell


app.post('/users/signup', function (req, res){

    var fn = req.body.firstname;
    var ln = req.body.lastname;
    var bd = req.body.birthdate;
    var em = req.body.email;
    var un = req.body.username;
    var pass = req.body.password;

    mongo.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("AlljsPOCDB");
        var query = {
            firstname : fn,
            lastname : ln,
            birthdate : bd,
            email : em,
            username : un,
            password : pass
        };
        //insert new user
        dbo.collection("users").insertOne(query, function(err, result, docsInserted){
            if (err) throw err;

            if(result.length === 0 ){
                res.status(404);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    errorCode: 404,
                    errorMessage: "Something went wrong, try again!"
                }));
                res.end();
            }else {
                res.setHeader('Content-Type', 'application/json');
                res.send({
                    insertedCount: result.insertedCount,
                    insertedId: result.insertedId,
                    n: result.result.n,
                    ok : result.result.ok
                });
                res.end();
            }
            //console.log("Item inserted");
            db.close();
        });        
    });
});

var server = app.listen(9090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
