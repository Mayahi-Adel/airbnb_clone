const express = require('express');
const Users = require('../models/users.model');

// constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
const NAME_REGEX = /^([a-zA-Z ]+)$/;

exports.signup = (req, res) => {
    // Params
    const {
        email,
        first_name,
        last_name,
        password,
        role
    } = req.body;
    // const email = req.body.email;
    // const first_name = req.body.username;
    // const last_name = req.body.lastname;
    // const password = req.body.password;
    // const role = req.body.role;


    if (email == null || password == null || first_name == null || last_name == null) {
        return res.status(400).json({
            'error': 'missing parameters'
        });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({
            'error': 'email is not valid'
        });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
            'error': 'password invalid (must length 4 - 12 and include 1 number at least)'
        })
    }

    if (!NAME_REGEX.test(first_name)) {
        return res.status(400).json({
            'error': 'first_name invalid (must be a string)'
        })
    }
    if (!NAME_REGEX.test(last_name)) {
        return res.status(400).json({
            'error': 'last_name invalid (must be a string)'
        })
    }

    Users.findOne(email, (error, response) => {
        if (error) {
            response.send(error.message);
        }

        if (response == "") {

            Users.addOne(req.body, (error, result) => {
                if (error) {
                    result.send(error.message);
                }
                return res.status(201).json({
                    "succes": 'Add new user',
                    "role": "host",
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email

                })
            })
        } else {
            return res.status(409).json({
                'error': 'user already exist',
            })
        }

    });

}