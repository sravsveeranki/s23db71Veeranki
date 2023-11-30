const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
    AnimalName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        // Custom validation function for unique names
        validate: {
            validator: async function(value) {
                const existingBrand = await this.constructor.findOne({ name: value });
                return !existingBrand; // Returns true if the name is unique
            },
            message: 'Brand name must be unique',
    },
    },
    AnimalColour: String,
    AnimalType: { 
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Define your custom validation logic here
                // For example, let's say AnimalType should be at least 3 characters long
                return v.length >= 3;
            },
            message: props => `${props.value} is too short for AnimalType! It should be at least 3 characters.`,
        }
    }
});


module.exports = mongoose.model("Animal", animalSchema);
