var express = require("express");
const animal_controlers = require("../controllers/animalController");
var router = express.Router();
const passport = require('passport');
// GET Animals
router.get("/", animal_controlers.animal_view_all_Page);
module.exports = router;

// A little function to check if we have an authorized user and continue on 
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }

// GET request for one animal.
router.get('/animals/:id', animal_controlers.animal_detail);

// PUT request to update a animal.
router.put('/animals/:id', animal_controlers.animal_update_put);

/* GET detail animal page */
router.get('/detail', animal_controlers.animal_view_one_Page);

/* GET create animal page */
router.get('/create', animal_controlers.animal_create_Page);

/* GET delete animal page */
router.get('/delete', animal_controlers.animal_delete_Page);
 
 /* GET update costume page */
router.get('/update', secured, 
animal_controlers.animal_update_Page);

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
   });

module.exports = router;