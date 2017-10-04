const router = require('express').Router();
const { Project, User } = require('../db/models');
const { isSelf } = require('./gatekeepers');

module.exports = router;

// get a specific project
router.get('/:id', (req, res, next) => {
  Project.findById(Number(req.params.id))
    .then(project => res.json(project))
    .catch(next);
});

// create a new project
// the isSelf gatekeeper makes sure that users cannot
// make a project for another user
router.post('/', isSelf, (req, res, next) => {
  Project.create(req.body)
    .then(project => res.json(project))
    .catch(next);
});

// update project
router.put('/:id', isSelf, (req, res, next) => {
  Project.findById(Number(req.params.id))
    .then(project => res.json(project.update(req.body)))
    .catch(next);
});

router.put('/:id/addCollab', (req, res, next) => {
  Project.findOne({ where: { id: Number(req.params.id) }, include: [{ model: User, through: 'usersProjects' }] })
  .then((project) => {
    project.addUser(req.body.id);
    return project.save();
  })
  .then(project => res.json(project))
  .catch(next);
});