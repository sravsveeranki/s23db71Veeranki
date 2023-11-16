var animal = require('../models/animal');
// List of all Animals

exports.animal_list = async function (req, res) {
    try {
        theAnimals = await animal.find();
        res.send(theAnimals);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.animal_view_all_Page = async function (req, res) {
    try {
        theAnimalss = await animal.find();
        res.render('Animals', { title: 'Animal Search Results', results: theAnimals });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific animal.
exports.animal_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: animal detail: ' + req.params.id);
};
// Handle Animal create on POST.
//Handle Animal create on POST.
exports.animal_create_post = async function (req, res) {
    console.log(req.body)
    let document = new animal();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"animal_type":"cat", "colour":"grey", "type":"mammal"}
    document.AnimalName = req.body.AnimalName;
    document.AnimalType = req.body.AnimalType;
    document.AnimalColour = req.body.AnimalColour;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle animal delete form on DELETE.
exports.animal_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: animal delete DELETE ' + req.params.id);
};
// Handle animal update form on PUT.
exports.animal_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: animal update PUT' + req.params.id);
};

// Handle Animal detail on GET.
exports.animal_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        const foundanimal = await animal.findById(req.params.id);
        if (foundanimal == null) {
            res.status(404);
            res.send(`{"error": "animal not found"}`);
        } else {
            res.send(foundanimal);
        }
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle animal update form on PUT.
exports.animal_update_put = async function (req, res) {
    console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await animal.findById(req.params.id);

        // Check if the document exists
        if (!toUpdate) {
            res.status(404).send(`{"error": "animal with ID ${req.params.id} not found"}`);
            return;
        }

        // Do updates of properties
        if (req.body.AnimalName) toUpdate.AnimalName = req.body.AnimalName;
        if (req.body.AnimalType) toUpdate.AnimalType = req.body.AnimalType;
        if (req.body.AnimalColour) toUpdate.AnimalColour = req.body.AnimalColour;

        // Handle checkbox (assuming it's named checkboxsale in the body)
        if (req.body.checkboxsale) {
            toUpdate.sale = true;
        } else {
            toUpdate.sale = false;
        }

        let result = await toUpdate.save();

        // Include the sale property in the response
        result = result.toObject(); // Convert Mongoose document to a plain JavaScript object
        result.sale = toUpdate.sale;

        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// Handle Animal delete on DELETE.
exports.animal_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await animal.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};



// Handle a show one view with id specified by query
exports.animal_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        const result = await animal.findById(req.query.id)
        if (!result) {
            res.status(404)
            res.send('Animal not found');
            return;
        }
        res.render('animaldetail', { title: 'Animal Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a animal.
// No body, no in path parameter, no query.
// Does not need to be async
exports.animal_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('animalcreate', { title: 'animal Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating an animal.
// query provides the id
exports.animal_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        const result = await animal.findById(req.query.id)
        if (!result) {
            res.status(404)
            res.send('Animal not found');
            return;
        }
        res.render('animalupdate', { title: 'Animal Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// Handle a delete one view with id from query
exports.animal_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await animal.findById(req.query.id)
        res.render('animaldelete', {
            title: 'animal Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
