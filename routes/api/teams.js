const express = require('express');
const router = express.Router();

const db = require('../../data/mongo');

router.get('/', function (req, res, next) {
    const info = {
        query: {},
        collection: req.app.locals.collectionTeams
    }
    db.readAll(info)
    .then((teams) => {
        res.json(teams)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/', function (req, res, next) {
    const info = {
      doc: req.body,
      collection: req.app.locals.collectionTeams,
    }
    db.createOne(info)
      .then((data) => {
        res.json(data.ops[0]);
      })
      .catch(err => {
        console.log(err)
      })
  })
  router.delete('/:id', function (req, res, next) {
    const info = {
      id: req.params.id,
      collection: req.app.locals.collectionTeams,
    }
    db.deleteOne(info)
      .then((data) => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      })
  })

  router.put('/:id', function (req, res, next) {
    const info = {
      id: req.params.id,
      doc: req.body,
      collection: req.app.locals.collectionTeams
    }
    db.replaceOne(info)
      .then((data) => {
        res.json({msg: `updated ${info.id}`});
      })
      .catch(err => {
        console.log(err);
      })
  })

module.exports = router;