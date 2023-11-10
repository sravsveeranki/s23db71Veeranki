const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
    AnimalName: String,
    AnimalColour: String,
    AnimalType: String
})
module.exports = mongoose.model("Animal",
    animalSchema)