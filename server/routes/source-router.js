const router = require('express').Router();
const models = require('../db/models/index');

const Source = models.source;
// /api/source
const getAllSources = (req, res) => {
  Source.findAll()
  .then(apps => res.send(apps));
};

// /api/source
const postNewSource = (req, res) => {
  Source.create(req.body)
  .then((app) => {
    res.send(app);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/source/id/:id
const getSourceById = (req, res) => {
  Source.findById(req.params.id)
  .then((app) => {
    res.send(app);
  })
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllSources)
  .post(postNewSource);

router.route('/id/:id')
  .get(getSourceById);

module.exports = router;
