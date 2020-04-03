var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/AlljsPOCDB";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AlljsPOCDB");
    dbo.createCollection("users", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      let myobj = { username: "testusr", password: "PassW0rd!", email: "test_user@gmail.com" };
      res.insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
      db.close();
    });
  });