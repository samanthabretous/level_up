const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../db/models/index');

const Company = models.company;
// /api/company
const getAllCompanies = (req, res) => {
  Company.findAll()
  .then(apps => res.send(apps));
};

// /api/company
const postNewCompany = (req, res) => {
  Company.create(req.body)
  .then((app) => {
    res.send(app);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/company/id/:id
const getCompanyById = (req, res) => {
  Company.findById(req.params.id)
  .then((app) => {
    res.send(app);
  })
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllCompanies)
  .post(postNewCompany);

router.route('/id/:id')
  .get(getCompanyById);

module.exports = router;
