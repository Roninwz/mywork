var express = require('express');
var router = express.Router();
var friend = require('../controller/friend');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('friend');
});


router.get('/add', function(req, res, next) {
  res.render('addfriend');
});
router.post('/add',friend.addFriend);

router.get('/edit',friend.editFriend);
router.post('/edit',friend.toEditFriend);
router.post('/delFriend',friend.delFriend);
router.post('/list', friend.getFriends);
module.exports = router;
