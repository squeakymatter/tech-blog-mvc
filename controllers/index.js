// `controllers/index.js` collects packaged group of API endpoints and prefixes them with path `/api'
//when we import routes to `server.js`, they'll be packaged up and ready to go in this file.

const router = require('express').Router()

const apiRoutes = require('./api')

router.use('/api', apiRoutes)

//if reqest to endpoing doesn't exist, reply with 404 (incorrect resource)
router.use((req, res) => {
  res.status(404).end()
})

module.exports = router
