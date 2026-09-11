'use strict';
import { status } from "./../response.js";

export const index = (req, res) => {

    res.render('index');
   // res.sendFile('../public/index.html');
    //status("Hello REST API NODEJS", res);
};

/*
const response = require("./../response.js");

export const index = (req, res) => {
    response.status("Hello REST API NODEJS", res);
}*/
