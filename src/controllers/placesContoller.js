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
        const added = await Places.addOne(newPlace);
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

exports.getPlace = async (req, res) => {

    const placeId    = req.params.placeId;

    try {
        let place = await Places.findOne(placeId);
        
        if (place[0].length != 0) {

            place = place[0][0];
            return res.status(200).json({
                
                    "id": place.placeId,
                    "city": place.name,
                    "name": place.placeName,
                    "description": place.description,
                    "rooms": place.rooms,
                    "bathrooms": place.bathrooms,
                    "max_guests": place.max_guests,
                    "price_by_night": place.price_by_night,
                    "available": place.available
                
            })
        } else {
            return res.status(404).json({
                "message": "The requested resource does not exist"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}