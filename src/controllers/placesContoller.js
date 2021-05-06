const express = require('express');
const Places = require('../models/places.model');
const jwtUtils = require("../utils/jwt.utils");

exports.addPlace = async (req, res) => {

    const headerAuth = req.headers['authorization'];
    const user    = jwtUtils.getUserId(headerAuth);
    
    const { user_id, role } = user;
    
    if (user_id == -1) {
        return res.status(400).json({
            error: "You are not connected !"
        })
    } 
    
    if (role == 0){
        return res.status(403).json({
            error: "You dont have permission to add place, you are not a host"
        })
    }
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

exports.getPlaceById = async (req, res) => {

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

exports.getPlaces = async (req, res) => {
    try {
        let places = await Places.findAll();
        places = places[0];
        
        return res.status(200).json({
            places
        })

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}

exports.editPlace = async (req, res) => {

    const headerAuth = req.headers['authorization'];
    const user_id    = jwtUtils.getUserId(headerAuth);
    const placeId    = req.params.placeId;

    // Params
    const place = { 
        name: "",
        description: "",
        rooms: "",
        bathrooms: "",
        max_guests: "",
        price_by_night: "",
        available: "" };
    
    for ( const elt in req.body) {
        
        if(!(elt in place)) {
            return res.status(400).json({
                message: `the field ${elt} does not exist !`
            })
        }
    }

    if (user_id == -1) {
        return res.status(400).json({
            error: "You are not connected !"
        })
    } 

    try {
        const place = await Places.findOne(placeId);
        console.log(place[0])
        //let edited = await Places.update(placeId, req.body);
        return res.status(200).json({
            message: "On teste !"
        })

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}

exports.placesByCityName = async (req, res) => {

    const city = req.params.cityName;
    
    try {
        let places = await Places.findByCityName(city);
        places = places[0];
        
        return res.status(200).json({
            places
        })

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}