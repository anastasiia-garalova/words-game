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
                // пользователь найден
                // User ist gefunden
                console.log("Name:", login);

                // Сохраняем пользователя в сессии
                req.session.user = {
                    id: results[0].id,
                    name: results[0].name
                };

                //hideError();
                res.redirect(`/game.html#${login}`);
            } else {
                // пользователь не найден
                // Kein User ist gefunden
                //res.send("Name oder Passwort ist falsch.");
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

/*

1. Проверка формата (похож ли email на настоящий).
2. Проверка, что email не занят в базе данных.
3. Подтверждение email через письмо

✅ Проверка сложности пароля (например, минимум 8 символов).
✅ Хеширование паролей через bcrypt.

✅ Связь карточек с user_id.
✅ Пользователь видит только свои карточки.
*/

users.add = (req, res) => {
    console.log("add");

    const { name, email, password } = req.body;

    // Проверка формата email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Falsche E-Mail-Adresse"
        });
    }

    // Проверяем, существует ли email
    connection.query(
        'SELECT id FROM users WHERE email = ?',
        [email],
        (error, results) => {

            if (error) {
                res.redirect(`/index.html?error=501`);
            }

            // Email уже есть
            if (results.length > 0) {
                res.redirect(`/index.html?error=2`);
                return;
            }

            const now = new Date();
            const mysqlDate = now.toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            // Добавляем пользователя
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
/*
users.add = (req, res) => {
    console.log("add");

    const { name, email, password } = req.body;

    // Проверка формата (похож ли email на настоящий). 
    const validator = require('validator');


    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Falsche E-Mail-Adresse"
        });
    }

      // Проверяем, есть ли пользователь
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
        message: "Этот email уже зарегистрирован"
        });
    }

    //const email = name + "@gmail.com";
    const now = new Date();
    // Преобразуем в формат MySQL DATETIME: "YYYY-MM-DD HH:MM:SS"
    // In das MySQL-DATETIME-Format umwandeln: "YYYY-MM-DD HH:MM:SS"
    const mysqlDate = now.toISOString().slice(0, 19).replace('T', ' ');

    const sql = "INSERT INTO `users` (`name`, `email`, `password`, `created_at`) " +
        "VALUES('" + name + "','" + email + "','" + password + "','" + mysqlDate + "')";


    connection.query(
        'SELECT * FROM users WHERE name = ?',
        [name],
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error");
            } else {
                if (results.length > 0) {
                    // пользователь найден
                    // User ist gefunden
                    console.log("Diese nahme ist schon erstelt:", login);
                    res.redirect(`/`);
                } else {
                    connection.query(sql, (error, results) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send("Error");
                        } else {
                            if (results) {
                                console.log(results);
                            }
                            res.redirect(`/game.html#${login}`);
                        }
                    });

                }
            }
        });
}

*/