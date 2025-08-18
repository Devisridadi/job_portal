const express=require('express')
const cors=require('cors')
const connectDB =require('./db.js')

const applyroutes = require('./routes/applyroutes');
const authroutes = require('./routes/authroutes');
const jobSeedRoutes = require('./routes/jobSeed');

require('dotenv').config(); 
const app= express();
console.log('Mongo URI:', process.env.MONGO_URI); 

app.use(cors());
app.use(express.json());
app.use('/api', applyroutes);
app.use('/api', jobSeedRoutes);

connectDB();

app.use('/api/auth', authroutes);
app.listen(5000,() =>{
  console.log("app is running");

});



