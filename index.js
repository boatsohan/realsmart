const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname, 'pages')))
app.use(express.urlencoded({ extended: true }))
const http = require('http').Server(app);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;


let url = "mongodb://localhost:27017/";
let db_name = "realsmart";
let collection_name = "employee";



// mongoose.connection.on('error', err => {
//   console.error('MongoDB error', err)
// })


app.get('/employee', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    dbo.collection(collection_name).find({}).toArray(function (err, result) {
      if (err) throw err;

      var result_client = []
      var buff = []
      for (let index = 0; index < result.length; index++) {
        buff = []
        buff.push(result[index]['_id'])
        buff.push(result[index]['name'])
        buff.push(result[index]['phone'])
        buff.push(result[index]['email'])
        buff.push(result[index]['position'])
        buff.push(result[index]['updateAt'])
        result_client.push(buff)
      }
      // console.log(result_client);

      // res.send("<pre>" + JSON.stringify(result_client, null, 4) + "</pre>")
      res.send(result_client)
      db.close();
    });
  });
});
app.post('/employee', (req, res) => {
  // console.log(req.body)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    dbo.collection(collection_name).insertOne(req.body, function (err, result) {
      if (err) throw err;
      // console.log(result.ops[0]['_id']);
      res.send(result.ops[0]['_id'])
      db.close();
    });
  });
});
app.put('/employee', (req, res) => {
  // console.log(req.body)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    var o_id = new ObjectID(req.body['_id']);
    var myquery = { _id: o_id };
    var newvalues = {
      $set: {
        name: req.body['name'],
        phone: req.body['phone'],
        email: req.body['email'],
        position: req.body['position'],
        updateAt: req.body['updateAt']
      }
    };
    dbo.collection(collection_name).updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      // console.log(result.result.nModified);
      res.send("1 document updated")
      db.close();
    });
  });

});
app.delete('/employee', (req, res) => {
  // console.log(req.body)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    var o_id = new ObjectID(req.body['_id']);
    var myquery = { _id: o_id };
    dbo.collection(collection_name).deleteOne(myquery, function (err, result) {
      if (err) throw err;
      // console.log(result.deletedCount)
      res.send("1 document deleted")
      db.close();
    });
  });
});


app.get('/employee_moc', (req, res) => {
  var dataSet = [
    ["1", "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25"],
    ["2", "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25"],
    ["3", "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12"],
    ["4", "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29"],
    ["5", "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28"],
    ["6", "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02"],
    ["7", "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06"],
    ["8", "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14"],
    ["9", "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15"],
    ["10", "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13"],
    ["11", "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19"],
    ["12", "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03"],
    ["13", "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16"],
    ["14", "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18"],
    ["15", "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17"],
    ["16", "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27"],
    ["17", "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09"],
    ["18", "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10"],
    ["19", "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13"],
    ["20", "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26"]
  ];
  res.send(dataSet)
});
app.use('/addmockup', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    var myobj = { name: "Company Inc", address: "Highway 37" };
    var myobjs = [
      {
        "name": "Tiger Nixon",
        "phone": "+7712345678",
        "email": "Tiger@gmail.com",
        "position": "Software Engineer",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Garrett Winters",
        "phone": "+7712345678",
        "email": "Garrett@gmail.com",
        "position": "Support Lead",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Ashton Cox",
        "phone": "+7712345678",
        "email": "Ashton@gmail.com",
        "position": "Sales Assistant",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Airi Satou",
        "phone": "+7712345678",
        "email": "Airi@gmail.com",
        "position": "Accountant",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Tatyana Fitzpatrick",
        "phone": "+7712345678",
        "email": "Tatyana@gmail.com",
        "position": "Junior Technical Author",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Dai Rios",
        "phone": "+7712345678",
        "email": "Dai@gmail.com",
        "position": "Senior Javascript Developer",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Gloria Little",
        "phone": "+7712345678",
        "email": "Gloria@gmail.com",
        "position": "System Architect",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Brielle Williamson",
        "phone": "+7712345678",
        "email": "Brielle@gmail.com",
        "position": "Software Engineer",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Quinn Flynn",
        "phone": "+7712345678",
        "email": "Quinn@gmail.com",
        "position": "Personnel Lead",
        "updateAt": "23/4/2564"
      },
      {
        "name": "Jena Gaines",
        "phone": "+7712345678",
        "email": "Jena@gmail.com",
        "position": "Systems Administrator",
        "updateAt": "23/4/2564"
      }
    ]
    dbo.collection(collection_name).insertMany(myobjs, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.end()
      db.close();
    });
  });
});
app.use('/index', (req, res) => {
  res.sendFile('pages/home.html', { root: __dirname })
});
app.use('*', (req, res) => {
  res.send("<br><br><br><h1 style='text-align: center'>The requested URL <U>" + req.baseUrl + "</U> was not found on this server.<br><br><a href='/index'>Go to homepage</a><br><br><img src='https://cdn.dutchcowboys.nl/uploads/images/error-404.jpg'></h1>");
});
var server = http.listen(3000, function () {
  console.log("Server is Running... At: http://localhost:%s", server.address().port);
});
