const express = require('express');
const app = express();
const connectDB = require("./src/Config/db");
app.use(express.json());
const port = 3000;

//used to connect to database
connectDB();



app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})