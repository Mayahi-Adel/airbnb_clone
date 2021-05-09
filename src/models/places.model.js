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
        available,
        image_url
    } = place;

    return await db.execute(`INSERT INTO place 
    (city_id, user_id, name, description, rooms, bathrooms, max_guests, price_by_night, available, image_url ) 
    VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?)`,
     [city_id, user_id, name, description, rooms, bathrooms, max_guests, price_by_night, available, image_url])
}

exports.findOne = async (placeId) => {
    return await db.execute(`SELECT *, place.id as placeId, place.name as placeName FROM place INNER JOIN city ON place.city_id = city.id WHERE place.id = ?`, [placeId]);
}

exports.findAll = async () => {
    return await db.execute(`SELECT place.id as placeId, place.name as placeName, description, rooms, bathrooms, max_guests, price_by_night, image_url, city.name as city FROM place INNER JOIN city ON place.city_id = city.id`)
}

exports.update = async (placeId, reqBody) => {
    return await db.execute(`UPDATE place SET `)
}

exports.findByCityName = async (city) => {
    return await db.execute(`SELECT place.id as id, place.name as name, description, rooms, bathrooms, max_guests, price_by_night, image_url, city.name as city FROM place INNER JOIN city ON place.city_id = city.id WHERE city.name = ?`, [city])
}

exports.deleteOne = async (placeId) => {
    db.execute(`DELETE FROM booking WHERE place_id = ?`, [placeId]);
    return db.execute(`DELETE FROM place WHERE id = ?`, [placeId]);
}