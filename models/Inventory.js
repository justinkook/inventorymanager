const mongoose = require('mongoose');

/* --- PHASE 1 - WRITE THE INVENTORY MODEL --- */

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var itemSchema = new Schema({
    itemName: {
        type: String,
        trim: true,
        unique: true,
        required: "Item Name is Required"
    },
    itemCount: {
        type: String,
        trim: true,
        required: "Item Count is Required"
    },
    itemID: {
        type: String,
        trim: true,
        unique: true,
        required: "Item ID is Required"
    }
});
// This creates our model from the above schema, using Mongoose's model method
const Inventory = mongoose.model("Inventory", itemSchema);

// Export the Inventory model
module.exports = Inventory;
