//const mysql = require("mysql");
import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "playwords_db"
})

connection.connect( error => {
    if (error) {
        console.log(error);
        return "Didn't connect";
    }
    else {
        console.log("Connected!)");
    }
});

//module.exports = connection;
export {connection};

/*
let query = "SELECT * FROM users";

connection.query(query, (err, result, fields) => {
    console.log(err);
    console.log(result);
    console.log(result[1]['name']);
    //console.log(fields);
});

connection.end( err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log("Closed!)");
    }
})*/
