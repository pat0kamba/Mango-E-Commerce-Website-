require('dotenv').config();
const {app} = require('./express.js');
const mongoose = require('mongoose');
const Port = 4000 || process.env.Port;
console.log(process.env.Port)

mongoose.connect(process.env.Mongo_Uri, {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log('connected successfully to the database')});
const Item = require('./models/user.model.js');

app.listen(Port, (err)=>{
    if(err)
    {
        console.error(err);
    }else{
        console.log(`The server is running on port ${Port}`);
    }
        
})