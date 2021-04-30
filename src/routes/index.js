const express = require("express")
const usersController = require('../controllers/usersController');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello, World!"
    })
});

// users routes
router.post('/signup/', usersController.signup);
router.post('/signin/', usersController.signin);



module.exports = router