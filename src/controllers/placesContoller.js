const express = require('express');
const Places = require('../models/places.model');
const jwtUtils = require("../utils/jwt.utils");

exports.addPlace = async (req, res) => {

    const headerAuth = req.headers['authorization'];
    const user_id     = jwtUtils.getUserId(headerAuth);

    // Params
    const { city_id, name, description, rooms, bathrooms, max_guests, price_by_night, available } = req.body;
    
    if (city_id == "" || name == "" || description == "" || rooms == "" || bathrooms == "" || max_guests == "" || price_by_night == "" ) {
        return res.status(400).json({
            error: "missing parameters"
        })
    }

    try {
        const newPlace = {
            city_id,
            user_id,
            name,
            description,
            rooms,
            bathrooms,
            max_guests,
            price_by_night,
            available
        }
        const added = await Places.addOne(newPlace)
        return res.status(201).json({
            succes: 'Add new place',
            data: {
                "city": city_id,
                "name": name,
                "description": description,
                "rooms": rooms,
                "bathrooms": bathrooms,
                "max_guests": max_guests,
                "price_by_night": price_by_night,
                "available": available
            }
        })

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }

}