const db = require('../db');
const express = require('express');

exports.findAll = async () => {
    return db.execute(`SELECT * FROM city`);
}