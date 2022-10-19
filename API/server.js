const  express = require('express');//llamamos a Express
const conn = require('./database.js');
const app = express();             

const port = 3000; // establecemos nuestro puerto

app.get('/api/oficinas', function(req, res) {
    // Realizar una consulta
  $query = 'SELECT * from oficinas';
  res.header("Access-Control-Allow-Origin", "*");
  conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      res.json(rows);
  });
});



app.get('/api/auth/:user/:pass', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let user = req.params.user || '';
  let pass = req.params.pass || '';
  

  $query = 'SELECT * from usuarios where nickname = \'' + user +'\' AND contrasena=\''+pass+'\'';
    
    conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      if(rows.length > 0){
        return res.send(true);
      }else{
        return res.send(false);
      }
  });

});

app.get('/api/type/:user', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let user = req.params.user || '';
  $query = 'SELECT rol from usuarios where nickname = \'' + user +"\'";
    
    conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      return res.json(rows);
  });

});


app.listen(port,()=>{

});
