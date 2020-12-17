import express from 'express';
import { addMovie, updateMovie, deleteMovie } from '../controllers/adminController.js';

const router = express();
router.post('/movies', addMovie);
router.patch('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie)

export default router;