const express = require('express');
const Review = require('../models/review');
const router = express.Router();

// Ruta para crear una nueva reseña (POST /api/reviews)
router.post('/', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        console.log(newReview);
        res.status(201).json(newReview);
      } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la reseña', error });
      }
});

// Ruta para obtener todas las reseñas (GET /api/reviews)
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find(); 
        console.log("aqui esta lo que encontre",reviews)
        res.json(reviews); 
    } catch (err) {
        res.status(400).send("no puedo traer las reseñas",err); 
    }
});

// Ruta para eliminar una reseña (DELETE /api/reviews/:id)
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reseña eliminada' }); 
    } catch (err) {
        res.status(400).send(err); 
    }
});

module.exports = router;