const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../db/models/index');

const User = models.user;
// /api/user
const getAllUsers = (req, res) => {
  User.findAll()
  .then(users => res.send(users));
};

// /api/user/registration
const postNewUser = (req, res) => {
  User.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      email: req.body.email,
      password: req.body.password,
    },
  })
  .spread((user, created) => {
    if (created) {
      res.send(user);
    } else {
      throw new Error('Invalid registration info.');
    }
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/user/authentication -- user authentication
const getUserAuthentication = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  .then((user) => {
    if (user) {
      // if password matches send over user info
      const isPasswordMatch = bcrypt.compareSync(req.body.password, user.get('password'));
      if (isPasswordMatch) {
        user.password = null;
        res.send(user);
      }
    } else {
      throw new Error('Invalid login info.');
    }
  })
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllUsers);

router.route('/registration')
  .post(postNewUser);

router.route('/authentication')
  .post(getUserAuthentication);

module.exports = router;
