import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModel.js';

const addMovie = asyncHandler(async (req, res) => {
    const {title, mainCast, director, poster, language, genre, duration, releasedDate, endScreening} = req.body;

    //const movieExists
    console.log("addMovie")
    console.log(Date())

    const movie = await Movie.create({
        title,
        mainCast,
        director,
        poster,
        language,
        genre,
        duration,
        releasedDate,
        endScreening
    })

    if (movie) {
        res.send(movie);
    } else {
        res.status(400);
        throw new Error('Invalid Data');
    }
});

const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
    if (movie) {
        res.send(movie);
    } else {
        res.status(400);
        throw new Error('Could not find movie');
    }
})

const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (movie) {
        res.send(movie);
    } else {
        res.status(400);
        throw new Error('Could not find movie');
    }
})
export {
  addMovie,
  updateMovie,
  deleteMovie,
}