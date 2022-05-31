const _ = require('lodash')
const Eater = require('../models/Eater.model')
const Restaurant = require('../models/Restaurant.model')
const Group = require('../models/Group.model')
const router = require('express').Router()


function chunkEvenly(array, size) {
    const chunkedArray = _.chunk(array, size)

    if (chunkedArray.length < 2) {
        return size
    }

    const secondLastItem = _.nth(chunkedArray, -2)
    const lastItem = _.last(chunkedArray)

    if (secondLastItem.length - lastItem.length <= 1) {
        return size
    }

    return chunkEvenly(array, size - 1)
}


/**
 * I wanted to avoid having the same groups/leaders we had the week before and used 
 * a couple of techniques to prevent this from happening:
 *  1. I shuffle the eaters, which decrease the chance for the groups to be created similarly previous week
 *  2. I choose the leader randomly
 * 
 *  The combination of those techniques above, doesn´t 100% avoid to have the groups/leaders we had the week before
 *  but makes it pretty unlikely to happen. 
 */
router.post('/create_groups', async (req, res) => {

    const eaters = await Eater.find()
    const restaurants = await Restaurant.find()
    const groups = await Group.find()

    // Gets the last week that was submitted
    const lastGroup = _.last(groups)
    const lastWeek = lastGroup?.week || 0

    // Shuffle eaters to decrease the chance for the eaters to be grouped as they were on the previous week
    const shuffleEaters = _.shuffle(eaters)

    // Splits the groups evenly with size difference of 1 or less
    const sizeEaters = chunkEvenly(shuffleEaters, 7)
    const groupsEaters = _.chunk(shuffleEaters, sizeEaters)

    // Gets a random restaurant
    const randomRestaurantIndex = _.random(0, restaurants.length - 1)
    const restaurantObject = restaurants[randomRestaurantIndex]

    const promises = groupsEaters.map(groupEaters => {
        const randomLeaderIndex = _.random(0, groupEaters.length - 1)
        const leaderObject = groupEaters[randomLeaderIndex]

        return Group.create({
            eaters: groupEaters.map(eater => eater.name),
            leader: leaderObject.name,
            restaurant: restaurantObject.name,
            week: lastWeek + 1
        })
    })

    Promise
        .all(promises)
        .then(() => {
            res.json({ message: "groups successfully created" })
        })
        .catch(err => res.status(500).json(err))
})


router.get('/groups', (req, res) => {

    Group
        .find()
        .then(allGroups => {
            res.json({ allGroups })
        })
        .catch(err => res.status(500).json({ message: "group not created yet" }))
})


module.exports = router

