const express = require("express")
const usersController = require("../controllers/usersController");
const placesController = require("../controllers/placesContoller");
const bookingsController = require("../controllers/bookingsController")
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
router.get("/places/city/:cityName", placesController.placesByCityName);
router.delete("/places/:placeId", placesController.removePlace);
// booking routes
router.post("/bookings", bookingsController.addBooking);
router.get("/bookings", bookingsController.getBookings);
router.delete("/bookings/:bookingId", bookingsController.removeBooking);



module.exports = router