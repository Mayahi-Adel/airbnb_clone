const express = require('express');
const Cities = require('../models/city.model');

exports.getCities = async (req, res) => {

    try {
        let cities = await Cities.findAll();
        cities = cities[0];
        return res.status(201).json({
            cities
        })
    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }
}