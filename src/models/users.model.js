const db = require('../db');
const express = require('express');

exports.findOne = async (email) => {
    return await db.execute(`SELECT * from user WHERE email = ?`, [email]);
}

exports.addOne = async (user) => {
    const {
        email,
        hash,
        first_name,
        last_name,
        role
    } = user;

    return await db.execute(`INSERT INTO user (email, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?)`, [email, hash, first_name, last_name, role]);
    //return await db.execute(`SELECT * from user WHERE email = ?`, [email]);
}