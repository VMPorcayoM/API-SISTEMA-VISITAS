var mysql = require('mysql'); 
var conn = mysql.createConnection({ 
  host: "localhost",
  user: "root", 
  port:3306,
  password: "123456789",
  database: 'registroentrada'
}); 
conn.connect(function(err) { 
    if (err) throw err;
  console.log('Database is connected successfully !');
});

function closeConnection() {
// Cerrar la conexión
conn.end(function(){
  // La conexión se ha cerrado
});
}


module.exports = conn;