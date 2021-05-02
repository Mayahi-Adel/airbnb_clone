const db = require('../db');
const express = require('express');

exports.addOne = async (place) => {
    const {
        city_id,
        user_id,
        name,
        description,
        rooms,
        bathrooms,
        max_guests,
        price_by_night,
        available
    } = place;

    return await db.execute(`INSERT INTO place 
    (city_id, user_id, name, description, rooms, bathrooms, max_guests, price_by_night, available ) 
    VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)`,
     [city_id, user_id, name, description, rooms, bathrooms, max_guests, price_by_night, available])
}