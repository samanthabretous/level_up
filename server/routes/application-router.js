const router = require('express').Router();
const models = require('../db/models/index');

const Application = models.application;
// /api/application
const getAllApplications = (req, res) => {
  Application.findAll()
  .then(apps => res.send(apps));
};

// /api/application
const postNewApplication = (req, res) => {
  Application.create(req.body)
  .then((app) => {
    res.send(app);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/application/id/:id
const getApplicationById = (req, res) => {
  Application.findById(req.params.id, {
    attributes: {
      exclude: ['positionId', 'companyId', 'sourceId'],
    },
    include: [
      models.source,
      models.company,
      models.position,
      {
        model: models.contact,
        include: [models.company, models.position],
        attributes: {
          exclude: ['applicationId', 'companyId'],
        },
      },
      {
        model: models.interview,
        include: [models.contact],
      },
    ],
  })
  .then((app) => {
    res.send(app);
  })
  .catch(err => res.status(500).send(err.message));
};

const updateRankStatusOrRejected = (req, res) => {
  Application.update({
    rank: req.body.rank,
    status: req.body.status,
    rejected: req.body.rejected,
  }, {
    where: {
      id: req.params.id,
    },
  })
  .then(() => Application.findAll({
    where: {
      userId: req.params.userId,
    },
    attributes: ['rank', 'createdAt', 'updatedAt', 'status', 'id', 'rejected'],
    include: [models.company],
  }))
  .then(apps => res.send(apps))
  .catch(err => res.status(500).send(err.message));
};

const getAllUserApplications = (req, res) => {
  Application.findAll({
    where: {
      userId: req.params.userId,
    },
    attributes: ['rank', 'createdAt', 'updatedAt', 'status', 'id', 'rejected'],
    include: [models.company],
  })
  .then(userApplications => res.send(userApplications))
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllApplications)
  .post(postNewApplication);

router.route('/id/:id')
  .get(getApplicationById);

// update routes
router.route('/update/:id/user/:userId')
  .put(updateRankStatusOrRejected);

router.route('/user/:userId')
  .get(getAllUserApplications);

module.exports = router;
