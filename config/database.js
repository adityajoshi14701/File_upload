const mongoose = require('mongoose')

require('dotenv').config()

exports.connect =()=>{
    mongoose.connect(process.env.DB_URL).then(console.log("Database connection is successfull")).catch((err)=>{
        console.log("There was an error while connecting database")
        console.log(err.message)
        process.exit(1);
    })
}

