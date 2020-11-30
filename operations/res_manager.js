const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
      //console.log('Connected!');
    
});
const res_man = express.Router();

res_man.use(bodyparser.json());

res_man.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })
.get((req,res,next)=>{
    
    connection.query('SELECT * FROM restaurant_manager ', (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
.post( (req, res, next) => {
   
    connection.query('select count(*) as cou from restaurant_manager where Manager_Name="'+req.body.Manager_Name+'";', (err,rows) => {
        if(err) throw err;
      if(rows[0].cou ==0){
        connection.query('insert into restaurant_manager (Manager_Name,Manager_Email,Password,Join_date) values("'+ req.body.Manager_Name +'","'+ req.body.Manager_Email +'" , "'+req.body.Password + '", current_date());', (err,rows) => {
            if(err) throw err;
          
           // console.log('Data inserted into Db:');
            res.send('Will add the manager: ' + req.body.Manager_Name + ' with details: ' + req.body.Manager_Email);
        });
      }else{
          //console.log('already exists');
          res.end('user exists');
      }
        
    });
   })
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /chefs');
  })
.delete((req, res, next) => {
    res.end('Deleting all the chefs!');
  });
  

res_man.route('/:chefId')
//for dishid
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send details of the chef: '+ req.params.chefId +' to you!');
  })
  
.post( (req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /chefs/'+ req.params.chefId);
   })
  
.put( (req, res, next) => {
      res.write('Updating the chef: ' + req.params.chefId + '\n' );
      res.end('will update the chef: ' + req.body.name + ' with details: ' + req.body.description);
  })
  
.delete( (req, res, next) => {
    res.end('Deleting chef: ' + req.params.chefId);
});
  
module.exports = res_man;