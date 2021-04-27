const db = require('../db');
const bcrypt = require('bcrypt');
const express = require('express');

exports.findOne = (email, callback) => {
    db.execute(`SELECT * from User WHERE email = ?`, [email], (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return
        }
        callback(null, result);
    });
}

exports.addOne = (reqBody, callback) => {
    const email = reqBody.email;
    const password = reqBody.password;
    const first_name = reqBody.first_name;
    const last_name = reqBody.last_name;
    const role = reqBody.role;

    bcrypt.hash(password, 10, (err, bcryptedPassword) => {
        db.execute(`INSERT INTO User SET email=?, password=?, firstname=?, lastname=?, role=?`, [email, bcryptedPassword, first_name, last_name, role], (error, result) => {
            if (error) {
                console.log("error : ", error);
                callback(error, null);
            }
            callback(null, result);
        })
    });
}