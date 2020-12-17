import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mainCast: {
        type: [],
        required: true
    },
    director: {
        type: [],
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    language: {
        type: String,
        require: true
    },
    genre: {
        type: [],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    releasedDate: {
        type: String,
        required: true
    },
    endScreening: {
        type: String,
        required: true
    },
    cinemaNumber: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
},
{
    timestamp: true,
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

