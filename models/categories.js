const mongoose = require('mongoose');

var categorieSchea = new mongoose.Schema({
    name : String
});

var Categorie = mongoose.model('Categorie', categorieSchea);

module.exports = Categorie;