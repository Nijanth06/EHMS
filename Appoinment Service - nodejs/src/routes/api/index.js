const express = require('express')
const router = express.Router()

const appointment = require('./appointment.route')
router.use('/', appointment)

module.exports = router
