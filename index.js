const config = require('config');
const mongoose = require('mongoose');
const usersRoute = require('./routes/user.route');
const express = require('express');
const app = express();

if(!config.get("myprivatekey")){
    console.error("FATAL ERROR: myprivatekey is not defined.")
    process.exit(1);
}

mongoose
    .connect("mongodb://localhost/nodejsauth",{useNewUrlParser:true})
    .then(()=>console.log("Connected to mongoDB"))
    .catch((err)=>console.error("Could not connect to mongoDb"));

app.use(express.json());
app.use("/api/users",usersRoute);

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port${port}`));