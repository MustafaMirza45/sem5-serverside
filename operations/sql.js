
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a beacon of hope',
  database: 'foodinn'
});

/*connection.connect((err) => {
    
  if (err) throw err;
  console.log('Connected!');

});
connection.query('SELECT * FROM restaurant_manager where Manager_id= 1 ', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
});

connection.end((err)=>{
    (err?console.log(err):console.log('no error'));
});*/
module.exports = connection;