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

app.get('/api/visita/:folio', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let folio = req.params.folio || '';
  $query = 'SELECT * from visitas where id = \'' + folio +"\'";
    
    conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      return res.json(rows);
  });

});

app.post('/api/visita', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  //NSERT INTO `registroentrada`.`visitas` (`nombres`, `apellidoPaterno`, `apellidoMaterno`, `tipoIdentificacion`, `NoIdentificacion`, `telefono`, `correo`, `oficinaQueVisita`, `direccion`, `fechaIngreso`, `identificacionFrontal`, `identificacionTrasera`) VALUES ('Victor', 'Porcayo', 'Mercado', 'INE', '1232342341', '3138082842', 'vmkds@gmail.com', 'askdksd', 'akdmaksdk', 'kamsd', 'asdjk', 'kasjd');
  
  $query = `INSERT INTO visitas 
  ('nombres','apellidoPaterno','apellidoMaterno','tipoIdentificacion',
  'NoIdentificacion','telefono','correo','oficinaQueVisita','direccion',
  'fechaIngreso','identificacionFrontal','identificacionTrasera')   
   VALUES (${req.body.nombres},${req.body.apellidoPaterno}, ${req.body.apellidoMaterno},
    ${req.body.tipoIdentificacion},${req.body.NoIdentificacion},${req.body.telefono},${req.body.correo},
    ${req.body.oficinaQueVisita},${req.body.direccion},${req.body.fechaIngreso},${req.body.identificacionFrontal},${req.body.identificacionTrasera})`;
        
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
