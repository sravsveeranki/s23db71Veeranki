var express = require("express");
const animal_controlers = require("../controllers/animalController");
var router = express.Router();
// GET Animals
router.get("/", animal_controlers.animal_view_all_Page);
module.exports = router;