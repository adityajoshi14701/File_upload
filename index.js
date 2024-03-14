const express = require('express')
const app= express()

require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
const fileupload = require("express-fileupload");

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const db = require("./config/database");
db.connect();

const cloud = require('./config/cloud')
cloud.cloudinaryConnect();

const fileUploadRoutes = require('./routes/fileUpload')
app.use('/api/v1/upload',fileUploadRoutes);


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})