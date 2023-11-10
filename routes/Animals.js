var express = require("express");
const animal_controlers = require("../controllers/animalController");
var router = express.Router();
// GET Animals
router.get("/", animal_controlers.animal_view_all_Page);
module.exports = router;

// GET request for one animal.
router.get('/animals/:id', animal_controlers.animal_detail);

// PUT request to update a animal.
router.put('/animals/:id', animal_controlers.animal_update_put);
 
module.exports = router;