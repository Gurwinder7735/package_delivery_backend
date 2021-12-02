var express = require('express');
const Admin = require('../../models/AdminModel');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //  Admin.create({
  //     email:'admin@admin.com',
  //     password: '123'
  //  }).then(result => {
  //    console.log('RESULT', result);
  //  }).catch(err => {
  //    console.log(err.message);
  //  })
});

module.exports = router;
