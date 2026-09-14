"use strict";

import { status }  from "./../response.js";
import { connection }  from "./../settings/db.js";
import validator from 'validator';

export const users = (req, res) => {
    connection.query("SELECT * FROM `users`", (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            status(rows, res);
        }
    })
}

users.login = (req, res) => {

    const { login, password } = req.body;

    connection.query(
        'SELECT * FROM users WHERE name = ? AND password = ?',
        [login, password],
        (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error");
        } else {
            if (results.length > 0) {

                // User ist gefunden
                console.log("Name:", login);

                req.session.user = {
                    id: results[0].id,
                    name: results[0].name
                };

                res.redirect(`/game.html#${login}`);
            } else {
                // Kein User ist gefunden
                res.redirect(`/index.html?error=1`);
            }
        }
    });
};

users.logout = (req, res) => {

    req.session.destroy((error) => {

        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        }
        res.redirect("/index.html");
    });
};

users.add = (req, res) => {
    console.log("add");

    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Falsche E-Mail-Adresse"
        });
    }

    connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email],
        (error, results) => {

            if (error) {
                res.redirect(`/index.html?error=501`);
            }

            if (results.length > 0) {
                res.redirect(`/index.html?error=2`);
                return;
            }

            const now = new Date();
            const mysqlDate = now.toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const sql = `
                INSERT INTO users 
                (name, email, password, created_at)
                VALUES (?, ?, ?, ?)
            `;

            connection.query(
                sql,
                [name, email, password, mysqlDate],
                (error, results) => {

                    if (error) {
                        res.redirect(`/index.html?error=501`);
                    }

                    console.log("Neuer Benutzer ID:", results.insertId);

                    res.redirect(`/game.html#${name}`);

                }
            );
        }
    );
};
