const express = require('express');
const Places = require('../models/places.model');

exports.addPlace = async (req, res) => {
    // Params
    const { city_id, name, description, rooms, bathrooms, max_guests, price_by_night, available } = req.body;
    const user_id = 2;
    if (city_id == null || name == null || description == "" || rooms == "" || bathrooms == "" || max_guests == "" || price_by_night == "" ) {
        return {
            Status: (400),
            Msg: "missing parameters"
        }
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