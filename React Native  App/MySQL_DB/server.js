var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //empty for window
  database: 'blood_donor_info',
});

var server = app.listen(1111, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('start');
});

con.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('connected');
  }
});

app.get('/information', function (req, res) {
  con.query(
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
  con.query(sq, function (e, r, f) {
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
      con.query(sql, function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          res.send(rows);
        }
      });
    }
  });
});

app.delete('/information', function (req, res) {
  console.log(req.body);
  var id = req.body.ID;
  console.log(id);
  var sql = 'DELETE from information where ID = ' + id + '';
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
    }
  });
});
