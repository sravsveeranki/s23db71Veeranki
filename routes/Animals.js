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

/* GET detail animal page */
router.get('/detail', animal_controlers.animal_view_one_Page);

/* GET create animal page */
router.get('/create', animal_controlers.animal_create_Page);

/* GET create update page */
router.get('/update', animal_controlers.animal_update_Page);

/* GET delete animal page */
router.get('/delete', animal_controlers.animal_delete_Page);
 
module.exports = router;