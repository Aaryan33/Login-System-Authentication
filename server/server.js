// const express = require('express');   // alternative of 'import'
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";

const app = express();

/** middleware */
app.use(express.json());
app.use(cors());
// "morgan" library is used to log all the HTTP requests inside the console
app.use(morgan('tiny'));
app.disable('x-powered-by');  //less hackers know about our stack

const port = process.env.PORT || 8088;
app.get('/',(req,res) => {
    res.status(201).json("Home Get Request");
});

/** api routes */
app.use('/api',router);


/** start server only when we have valid connection */
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    }
    catch(error){
        console.log("Can't able to connect the server");
    }
}).catch(error => {
    console.log("Invalid database connection...");
})

// app.listen(port, () => {
//     console.log(`Server connected to http://localhost:${port}`);
// });

// // Handle database connection
// connect().then(() => {
//     console.log("Database connected");
// }).catch(error => {
//     console.log("Invalid database connection...");
// });
