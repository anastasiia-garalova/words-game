"use strict";

// settings/routes.js
import { index } from "../controllers/indexController.js"; // путь к контроллеру
import { users } from "../controllers/usersController.js"; // путь к контроллеру

export const routes = (app) => {


    console.log("routes");
    //app.route("/").get(index);
    app.route("/users").get(users);
    app.route("/login").post(users.login);
    app.route("/users/add").post(users.add);
    app.route("/logout").post(users.logout);
};

/*export const check = () {

}*/
/*
module.exports = (app) => {
    const indexController = require("controllers/indexController.js");

    app.route("/").get(indexController.index);
}*/