const router = require('express').Router()
const { User } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  //findAll() method is JS equivalent of `SELECT * FROM USERS`
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// GET /api/users/<user id>
router.get('/:id', (req, res) => {
  //findOne() method = SELECT * FROM users WHERE id = <user id>
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  /* create() method = 
  INSERT INTO users (username, email, password)
  VALUES ("Lernantino", "lernantino@gmail.com", "password1234"); */
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

//update existing data
// PUT /api/users/<user id>
// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    /* UPDATE users
      SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
      WHERE id = 1; */
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

//delete user from database
// DELETE /api/users/<user id>
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

//login route
router.post('/login', (req, res) => {
  // expects {username: 'Lernantino', password: 'password1234'}
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' })
      return
    }
    // Verify user using bCrypt checkPassword method
    const validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' })
  })
})

module.exports = router
