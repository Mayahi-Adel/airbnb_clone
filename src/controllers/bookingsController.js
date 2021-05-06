const express = require('express');
const Bookings = require('../models/booking.model');
const checkInputs = require('../utils/checkInputs');
const jwtUtils = require("../utils/jwt.utils");

exports.addBooking = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const user    = jwtUtils.getUserId(headerAuth);
    
    const { user_id, role } = user;
    
    if (user_id == -1) {
        return res.status(400).json({
            error: "You are not connected !"
        })
    } 
    
    if (role == 1){
        return res.status(403).json({
            error: "You are not authorized to access this resource"
        })
    }

    // Params
    const { place_id, check_in, check_out } = req.body;

    if (place_id == "" || check_in == "" || check_out == "") {
        return res.status(400).json({
            error: "missing parameters"
        })
    }

    // Il faut verifier les date !!
    // TO DO

    try {
        let booking = await Bookings.addOne(user_id, req.body);
        booking = booking[0][0];
        
        return res.status(201).json({
            "id": booking.id,
            "user": {
                "id": booking.userId,
                "first_name": booking.firstname,
                "last_name": booking.lastname,
                "email": booking.email
            },
            "place": {
                "id": booking.placeId,
                "name": booking.name,
                "description": booking.description,
                "rooms": booking.rooms,
                "bathrooms": booking.bathrooms,
                "max_guests": booking.max_guests,
                "price_by_night": booking.price_by_night
            },
            "check_in": booking.check_in,
            "check_out": booking.check_out
        })

    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}

exports.getBookings = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const user    = jwtUtils.getUserId(headerAuth);
    
    const { user_id, role } = user;
    
    if (user_id == -1) {
        return res.status(400).json({
            error: "You are not connected !"
        })
    } 

    try {
        let bookings = await Bookings.findAll(user_id);
        bookings = bookings[0];
        
        let data = [];

        for (let i=0; i < bookings.length; i++){
            data.push({
                "id": bookings[i].id,
                "user": {
                "id": bookings[i].userId,
                "first_name": bookings[i].firstname,
                "last_name": bookings[i].lastname,
                "email": bookings[i].email
            },
            "place": {
                "id": bookings[i].placeId,
                "name": bookings[i].name,
                "description": bookings[i].description,
                "rooms": bookings[i].rooms,
                "bathrooms": bookings[i].bathrooms,
                "max_guests": bookings[i].max_guests,
                "price_by_night": bookings[i].price_by_night
            },
            "check_in": bookings[i].check_in,
            "check_out": bookings[i].check_out
            })
        }

        return res.status(201).json({
            data
        })
    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }

}

exports.removeBooking = async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const user    = jwtUtils.getUserId(headerAuth);
    
    const { user_id, role } = user;
    
    if (user_id == -1) {
        return res.status(401).json({
            error: "You are not connected !"
        })
    } 
    
    try {
        // Params
        const booking_id = req.params.bookingId;
        const result = await Bookings.findOne(booking_id);
        console.log(result[0]);
        if(result[0].length == 0){
            return res.status(404).json({
                'error': 'The requested resource does not exist',
            })
        } else {
            const deleted = await Bookings.deleteOne(booking_id);
            return res.status(204).json()
        }


    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }


}