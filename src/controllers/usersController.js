const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const checkInputs = require('../utils/checkInputs');
const jwtUtils = require("../utils/jwt.utils")


exports.signup = async (req, res) => {
    // Params
    const { email, first_name, last_name, password, role } = req.body;

    
    // Check the user inputs
    console.log(req.body);
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
                data: {
                    "role": role,
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email
                }
            })
        } else {
            //console.log(result[0])
            return res.status(409).json({
                'error': 'user already exist',
            })
        }
    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }

}

exports.signin = async (req, res) => {
    // Params
    const { email, password } = req.body;
    
    try {
        const result = await Users.findOne(email)
        if (result[0].length == 0) {
            return res.status(401).json({
                'warning': "this user doesn't exist !" 
            })
        } else {
            const hash = result[0][0].password;
            console.log(hash)
            console.log(password)
            const isCorrect =  await bcrypt.compare(password, hash) ;// Pourquoi avec await ca marche pas !!
            console.log(isCorrect)
            if(!isCorrect){
                return res.status(401).json({
                    'warning': "invalid pasword !" 
                })
            } else {
                const user = {
                    user_id : result[0][0].id,
                    firstname: result[0][0].firstname,
                    lastname: result[0][0].lastname,
                    email: result[0][0].email,
                    role: result[0][0].role == 0 ? "touriste" : "h??te"
                }
                const token = await jwtUtils.generateTokenForUser(result[0][0])
                
                return res.status(200).json({
                    token,
                    user
                })
            }   
        }
    } catch (error) {
        console.error(error)
        res.status(409).send(error.message)
    }

}