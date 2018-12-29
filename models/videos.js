const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    idVideo: String,
    title: String,
    image: String,
    categorie : String
});

var Video = mongoose.model('videos', videoSchema);

module.exports = Video;