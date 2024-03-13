const express = require('express')
const app= express()

require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())


const dbConnect = require('./config/database');
dbConnect();

const cloud = require('./config/cloud')
cloud();

const fileUploadRoutes = require('./routes/fileUpload')
app.use('app/v1',fileUploadRoutes);