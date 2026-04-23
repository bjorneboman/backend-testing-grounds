const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        year: {type: Number},
        genre: {type: String},
    }, {timestamps: true}
)

module.exports = mongoose.model('Movie', movieSchema)