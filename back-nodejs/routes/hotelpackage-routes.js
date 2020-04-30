
const router = require('express').Router();
const db = require('../controller/hotelpackage');

router.get('/hotelpackage/list', db.getHotelPackage); // Get HotelPackage
router.get('/hotelpackage/:id', db.getHotelPackageById); // Get HotelPackage by ID
router.post('/hotelpackage', db.createHotelPackage); // Create HotelPackage
router.delete('/hotelpackage/:id', db.deleteHotelPackage); // Get HotelPackage by ID
router.put('/hotelpackage/:id', db.updateHotelPackage); // Update HotelPackage by ID

module.exports = router;