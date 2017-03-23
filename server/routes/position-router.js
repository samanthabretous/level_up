const router = require('express').Router();
const models = require('../db/models/index');

const Position = models.position;
// /api/position
const getAllPositions = (req, res) => {
  Position.findAll()
  .then(apps => res.send(apps));
};

// /api/position
const postNewPosition = (req, res) => {
  Position.create(req.body)
  .then((app) => {
    res.send(app);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/position/id/:id
const getPositionById = (req, res) => {
  Position.findById(req.params.id)
  .then((app) => {
    res.send(app);
  })
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllPositions)
  .post(postNewPosition);

router.route('/id/:id')
  .get(getPositionById);

module.exports = router;
