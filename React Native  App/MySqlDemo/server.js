var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mySql = require('mysql');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var db = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blood_donor_info',
});

var server = app.listen(1111, function () {
  var address = server.address().address;
  var port = server.address().port;
  console.log('Start');
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

app.get('/information', function (req, res) {
  db.query(
    'SELECT * FROM information order by Name',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
});

app.post('/information', function (req, res) {
  console.log(req.body);
  var sq = "select * from information where Name='" + req.body.Name + "'";
  db.query(sq, function (e, r, f) {
    if (e) {
      console.log(e);
    } else if (r.length === 0) {
      var sql =
        "INSERT into information values(null,'" +
        req.body.Name +
        "'," +
        req.body.Phone +
        ", '" +
        req.body.Blood_Group +
        "')";
      db.query(sql, function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          res.send(rows);
        }
      });
      var sq = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      db.query(sq, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    }
  });
});

app.delete('/information', function (req, res) {
  console.log(req.body);
  var id = req.body.ID;
  console.log(id);
  var sql = 'DELETE from information where ID = ' + id + '';
  db.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
    }
  });
});
