'use strict';

// Для ES-модуля
export const status = (value, res) => {
    const data = {
        status: 200,
        value: value
    };
    console.log("Response: ", data);
    res.json(data);
    res.end();

};
/*
exports.status = (value, res) => {
    const data = {
        "status": 200,
        "value": value
    };

    res.json(data);
    res.end();
};
*/