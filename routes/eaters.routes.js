const Eater = require('../models/Eater.model')
const Restaurant = require('../models/Restaurant.model')
const router = require('express').Router()


router.post('/eaters', (req, res) => {

    const { name, email } = req.body

    Eater
        .create({ name, email })
        .then(newEater => res.json(newEater))
        .catch(err => res.status(500).json(err))
})


router.get('/eaters', (req, res) => {

    Eater
        .find()
        .then(allEaters => {
            res.json({ allEaters })
        })
        .catch(err => res.status(500).json(err))
});


router.delete('/eaters', (req, res) => {
    const promise1 = Eater.remove()
    const promise2 = Restaurant.remove()
    const promises = [promise1, promise2]

    Promise
        .all(promises)
        .then(() => {
            res.json({ message: "eaters and restaurants removed" })
        })
        .catch(err => res.status(500).json(err))
});


// Bonus | Editing eater data
router.put('/eaters/:eaterId', (req, res) => {
    const { name, email } = req.body
    const { eaterId } = req.params

    Eater
        .findByIdAndUpdate(eaterId, { name, email })
        .then(eater => res.json(eater))
        .catch(err => res.status(500).json(err))
})


module.exports = router