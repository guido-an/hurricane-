const express = require('express')
const router = express.Router()
const Spot = require('../models/Spot')

router.get('/all', async (req, res) => {
  try {
    const spots = await Spot.find()
    .populate('posts')
    res.status(200).send(spots)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with sports 5000/all' })
  }
})

module.exports = router
