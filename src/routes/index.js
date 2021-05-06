const express = require("express")
const usersController = require("../controllers/usersController");
const placesController = require("../controllers/placesContoller")
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello, World!"
    })
});

// users routes
router.post("/signup/", usersController.signup);
router.post("/signin/", usersController.signin);
// places routes
router.post("/places/", placesController.addPlace);
router.get("/places/:placeId", placesController.getPlaceById);
router.get("/places/", placesController.getPlaces);
router.patch("/places/:placeId", placesController.editPlace);
router.get("/places/city/:cityName", placesController.placesByCityName)



module.exports = router