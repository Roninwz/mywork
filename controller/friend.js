var mongoose = require('mongoose');
require('../module/friend.js');
var Friend = mongoose.model('Friend');  //User为model name
var uuid = require('node-uuid');


// 添加
exports.addFriend = function(req, res) {
    var friendname=req.body.friendname;
    var tel=req.body.tel;
    var qq=req.body.qq;
    var email=req.body.email;
    var age=req.body.age;
    var birthday=req.body.birthday;
    var address=req.body.address;
    var sex=req.body.sex;
    var vsex;
        if('男'==sex){
            vsex=0;
        }else{
            vsex=1;
        }
        console.log('-'+friendname+'-'+tel+'-'+qq+'-'+email+'-'+age+"-"+birthday+'-'+address+'-'+sex+'-');
    var data=new Friend(
        {
            id:uuid.v1(),
            friendname:friendname,
            tel:tel,
            qq:qq,
            email:email,
            age:age,
            birthday:birthday,
            address:address,
            sex:vsex,
            adddate:new Date()
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};

// 分页获取
exports.getFriends = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Friend.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Friend.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
  };
  
  
exports.editFriend = function(req, res) {
    var id=req.query.id;

    console.log("wwwwwwwwwwww");
    console.log('id:'+id);
    Friend.findOne({id:id},function(err,data){

        if(err){

        }else{
            res.render("editfriend",{'data':data});
        }
      
    });
  

};
exports.toEditFriend = function(req, res) {
    var id=req.body.id;
    var friendname=req.body.friendname;
    var tel=req.body.tel;
    var qq=req.body.qq;
    var email=req.body.email;
    var age=req.body.age;
    var birthday=req.body.birthday;
    var address=req.body.address;
    var sex=req.body.sex;
    var vsex;
        if("男"==sex){
            vsex=0;
        }else{
            vsex=1;
        }
        console.log(id+'-'+friendname+'-'+tel+'-'+qq+'-'+email+'-'+age+"-"+birthday+'-'+address+'-'+sex+'-');
    var whereData = {"id":id}
    var updateDat = {$set: {"friendname":friendname,'tel':tel,'qq':qq,'email':email,'age':age,'birthday':birthday,'address':address,'sex':vsex}}; //如果不用$set，替换整条数据
    Friend.update(whereData, updateDat, function(error, result){
        if(error){
            res.json({"status":"error"})
        }else{
            // res.redirect('/admin')
           res.json({"status":"success"});
        }
    });

};

//删除一个管理员
exports.delFriend= function(req, res) {
    var id=req.body.id;
    console.log(id);
    Friend.remove({id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};