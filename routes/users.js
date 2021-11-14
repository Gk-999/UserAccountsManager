var express = require('express');
var router = express.Router();
const db = require('../database/queries')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', db.getUsers);

module.exports = router;
