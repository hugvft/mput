const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')

const app = express();

dotenv.config({ path: './.env'})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})
