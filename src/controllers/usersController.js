const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const checkInputs = require('../utils/checkInputs')



exports.signup = async (req, res) => {
    // Params
    const { email, first_name, last_name, password, role } = req.body;

    // Check the user inputs
    const { Status, Msg } = checkInputs(req.body);

    if (Status) {
        return res.status(Status).json({ "error": Msg });
    }
    // End check

    try {

        const result = await Users.findOne(email)

        if (result[0].length == 0) {
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = {
                email,
                hash,
                first_name,
                last_name,
                role
            }

            const added = await Users.addOne(newUser);
            console.log(added[0])
            return res.status(201).json({
                succes: 'Add new user',
                date: {
                    "role": "host",
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email
                }

            })
        } else {
            console.log(result[0])
            return res.status(409).json({
                'error': 'user already exist',
            })
        }
    } catch (error) {
        console.error("hello", error)
        res.status(409).send(error.message)
    }

}