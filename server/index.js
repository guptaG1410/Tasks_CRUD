const express = require('express');
const cors = require('cors');
require('dotenv').config();
const config = require('./db/config');
const router = require('./routes/router')
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3001;


config.connect((err) => {
    if(err) 
        console.log(`DB is not connected due to : ${err}`);
    else {
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
        console.log('DB is connected!');
    }
})