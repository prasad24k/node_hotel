const express = require('express')
const app=express();
const db = require('./db');
const rout=express.Router();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const { join } = require('lodash');

app.get('/',function(req,res) {
  res.send('welcome to our hotel..')
});
// Import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

// Use the router middleware
app.use('/person', personRoutes);
app.use('/menu',MenuItemRoutes);


app.listen(3000,()=>{
  console.log('listening on port 3000')
});


