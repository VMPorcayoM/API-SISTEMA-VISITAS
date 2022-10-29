const  express = require('express');//llamamos a Express
const bp    = require('body-parser');
const cors = require('cors');
const conn = require('./database.js');
const app = express();     
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
  
} 
app.use(cors(corsOptions));
app.use(bp.json({ limit: "50mb" }))
app.use(bp.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

const port = 3000; // establecemos nuestro puerto

app.get('/api/oficinas', function(req, res) {
    // Realizar una consulta
  $query = 'SELECT * from oficinas';
  conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      res.json(rows);
  });
});



app.get('/api/auth/:user/:pass', function(req, res) {
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
app.get('/api/visita', function(req, res) {
  let folio = req.params.folio || '';
  $query = 'SELECT * from visitas';
    
    conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      return res.json(rows);
  });

});

app.get('/api/usuarios', function(req, res) {
  let folio = req.params.folio || '';
  $query = 'SELECT nickname, rol from usuarios';
    
    conn.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error ocurred performing the query.");
          return;
      }
      return res.json(rows);
  });

});

app.post('/api/nuevavisita', (req, res)=> {

  //NSERT INTO `registroentrada`.`visitas` (`nombres`, `apellidoPaterno`, `apellidoMaterno`, `tipoIdentificacion`, `NoIdentificacion`, `telefono`, `correo`, `oficinaQueVisita`, `direccion`, `fechaIngreso`, `identificacionFrontal`, `identificacionTrasera`) VALUES ('Victor', 'Porcayo', 'Mercado', 'INE', '1232342341', '3138082842', 'vmkds@gmail.com', 'askdksd', 'akdmaksdk', 'kamsd', 'asdjk', 'kasjd');

  $query = `INSERT INTO  visitas
  (nombres,apellidoPaterno,apellidoMaterno,tipoIdentificacion,
  NoIdentificacion,telefono,correo,oficinaQueVisita,direccion,
  fechaIngreso,identificacionFrontal,identificacionTrasera,motivo)   
   VALUES ('${req.body.nombres}','${req.body.apellidoPaterno}', '${req.body.apellidoMaterno}',
    '${req.body.tipoIdentificacion}','${req.body.NoIdentificacion}','${req.body.telefono}','${req.body.correo}',
    '${req.body.oficinaQueVisita}','${req.body.direccion}','${req.body.fechaIngreso}','${req.body.identificacionFrontal}','${req.body.identificacionTrasera}','${req.body.motivo}')`;
        
    conn.query($query, function(err, rows, fields) {      
      if(err){
          console.log("An error ocurred performing the query. "+err.message);
          return res.send('error')  ;
      }
      return res.send(String(rows.insertId));
  });

});

app.post('/api/usuario', (req, res)=> {

  $query = `INSERT INTO  usuarios
  (nickname,contrasena,rol)   
   VALUES ('${req.body.nickname}','${req.body.contrasena}', '${req.body.rol}')`;
        
    conn.query($query, function(err, rows, fields) {      
      if(err){
          console.log("An error ocurred performing the query. "+err.message);
          return res.send(false);
      }
      return res.send(true);
  });

});


app.listen(port,()=>{

});
