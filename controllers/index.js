// `controllers/index.js` collects packaged group of API endpoints and prefixes them with path `/api'
//when we import routes to `server.js`, they'll be packaged up and ready to go in this file.

const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./home-routes.js')
const dashboardRoutes = require('./dashboard-routes')

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)
module.exports = router
