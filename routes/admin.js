var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin');
  });

  router.get('/add', function(req, res, next) {
    res.render('addadmin');
  });
  router.get('/edit',admin.editAdmin);
  router.post('/edit',admin.toEditAdmin);

  router.post('/add',admin.addAdmin);
  router.post('/delAdmin',admin.delAdmin);
  
  router.post('/list', admin.getAdminsPage);
  module.exports = router;
  
