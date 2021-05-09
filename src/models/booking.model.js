const db = require('../db');
const express = require('express');

exports.addOne = async (user_id, reqBody) => {
    const {
        place_id,
        check_in,
        check_out
    } = reqBody;

    db.execute(`INSERT INTO booking (user_id, place_id, check_in, check_out) VALUES (?, ?, ?, ?)`, [user_id, place_id, check_in, check_out]);
    return db.execute(`SELECT booking.id, check_in, check_out, user.id as userId, email, firstname, lastname, place.id as placeId, name, description, rooms, bathrooms, max_guests, price_by_night FROM booking INNER JOIN user ON booking.user_id = user.id INNER JOIN place ON booking.place_id = place.id WHERE booking.user_id = ? AND booking.place_id = ?`, [user_id, place_id]);
}

exports.findAll = async (user_id) => {
    return db.execute(`SELECT booking.id, check_in, check_out, user.id as userId, email, firstname, lastname, place.id as placeId, name, description, rooms, bathrooms, max_guests, price_by_night FROM booking INNER JOIN user ON booking.user_id = user.id INNER JOIN place ON booking.place_id = place.id WHERE booking.user_id = ?`, [user_id]);
}

exports.findOne = async (booking_id) => {
    return db.execute(`SELECT * FROM booking WHERE id=?`, [booking_id]);
}

exports.deleteOne = async (booking_id) => {
    return db.execute(`DELETE FROM booking WHERE id = ?`, [booking_id]);
}