const router = require('express').Router();
const models = require('../db/models/index');

const Contact = models.contact;
// /api/contact
const getAllContacts = (req, res) => {
  Contact.findAll()
  .then(contacts => res.send(contacts));
};

// /api/contact
const postNewContact = (req, res) => {
  console.log(req.body)
  Contact.create(req.body)
  .then((contact) => {
    res.send(contact);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
};

// /api/contact/id/:id
const getContactById = (req, res) => {
  Contact.findById(req.params.id)
  .then((contact) => {
    res.send(contact);
  })
  .catch(err => res.status(500).send(err.message));
};

router.route('/')
  .get(getAllContacts)
  .post(postNewContact);

router.route('/id/:id')
  .get(getContactById);

module.exports = router;
