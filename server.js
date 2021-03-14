const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// turn on routes
app.use(routes)

// turn on connection to db and server
//sequelize.sync() method establish connection to db. sync means Sequelize is taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it.
//force: false means DON'T drop and recreate database tables on startup.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})
