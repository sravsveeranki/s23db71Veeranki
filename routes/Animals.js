var express = require('express');
var router = express.Router();

const results  = [
    { AnimalName: "Cat", AnimalType: "Mammal", AnimalColour: "Gray" },
    { AnimalName: "Eagle", AnimalType: "Bird", AnimalColour: "Brown" },
    { AnimalName: "Turtle", AnimalType: "Reptile", AnimalColour: "Green" }
  ]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Animals', { title: 'Search results of Animals', results: results });
});

module.exports = router;
