// const express = require('express')
import express from 'express';
import session from "express-session";
import "dotenv/config";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const PORT = 5000;
const IP = "127.0.0.1";
// const bodyParser = require('body-parser')

app.use(express.static('public'));

// app.use(bodyParser.urlencoded({extended:true})
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); // было

//const router = require('./settings/routes.js');
import { routes } from './settings/routes.js'; // стало
routes(app); // стало

/* было
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/login', (req, res) => {
    let loggetUser = req.body.login;
    console.log(loggetUser);
    res.redirect("/game.html#" + loggetUser);
})
*/

app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));