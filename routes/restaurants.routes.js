const Restaurant = require('../models/Restaurant.model')
const router = require('express').Router()


router.post('/restaurants', (req, res) => {

    const { name, address } = req.body

    Restaurant
        .create({ name, address })
        .then(() => {
            res.json({ message: "created" })
        })
        .catch(err => res.status(500).json(err))
})


router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then(allRestaurants => {
            res.json({ allRestaurants })
        })
        .catch(err => res.status(500).json(err))
});


module.exports = router