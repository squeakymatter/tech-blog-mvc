// routes/api/index.js collects and packages all API routes

const router = require('express').Router()

const userRoutes = require('./user-routes.js')

router.use('/users', userRoutes)

module.exports = router
