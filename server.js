const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const routes = require('./controllers/')
const sequelize = require('./config/connection')
const path = require('path')
const app = express()
const helpers = require('./utils/helpers')

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'thisIsASecret',
  cookie: {
    maxAge: 60000, //one minute
  },
  resave: false, //force session to be saved to session store
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))
const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// turn on routes
app.use(routes)

// turn on connection to db and server
//sequelize.sync() method establish connection to db. sync means Sequelize is taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it.
//force: false means DON'T drop and recreate database tables on startup.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})
