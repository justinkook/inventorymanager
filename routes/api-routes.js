// Require all models
const db = require('../models');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function (app) {

    /* --- PHASE 2 - WRITE THE ROUTES --- */

    // Route for retrieving all Inventory from the database via a GET request
    /* --- Code here --- */

    // Route for saving a new Inventory entry to the database via a POST request
    /* --- Code here --- */

    // Route for saving updates to inventory via a PUT request
    /* --- Code here --- */

    // ===============================================================================
    // ROUTING
    // ===============================================================================

    // GET Request
    // Responds with all the currently reserved tables
    app.get('/api/inventory', function (req, res) {
        db.Inventory.find({})
            .then(function (dbInventory) {
                res.json(dbInventory);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // POST Request
    // Adds a new table to our data collection
    // Responds with success: true or false if successful
    app.post("/api/inventory", function (req, res) {
        // Create a new user using req.body

        db.Inventory.create(req.body)
            .then(function (dbInventory) {
                // If saved successfully, send the the new User document to the client
                res.json(dbInventory);
            })
            .catch(function (err) {
                // If an error occurs, send the error to the client
                res.json(err);
            });
    });

    // PUT Request
    // Replaces the table at the referenced index with the one provided
    // Responds with success: true or false if successful
    app.put('/api/inventory', function (req, res) {

        db.Inventory.findOneAndUpdate({itemID: req.body.itemID},{$set: {itemCount: req.body.itemCount}})
            .then(function (dbInventory) {
                // If saved successfully, send the the new User document to the client
                res.json(dbInventory);
            })
            .catch(function (err) {
                // If an error occurs, send the error to the client
                res.json(err);
            });

    });
};