var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('../module/user.js');
var User = mongoose.model('User');  //User为model name
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login',function (req,res) {
  var name=req.body.username;
  var pwd=req.body.pwd;
  console.log(name+" "+pwd);
  User.findOne({username:name,password:pwd},function (error,result) {
      if (result==null)
      {
        console.log("登录失败");
       
        res.render('login');
      }else
      {
        console.log("登录成功");
        // res.render('index');
        res.redirect('/index');
      }
  })
})



module.exports = router;
