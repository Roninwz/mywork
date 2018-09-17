var mongoose = require('mongoose');
require('../module/admin.js');
var Admin = mongoose.model('Admin');  //User为model name
var uuid = require('node-uuid');



// 添加
exports.addAdmin = function(req, res) {
    var adminname=req.body.adminname;
    var adminpass=req.body.adminpass;
    var logindate=req.body.logindate;
  

    var data=new Admin(
        {
            id:uuid.v1(),
            adminname:adminname,
            adminpass:adminpass,
            logindate:new Date()
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            // res.redirect('/admin')
           res.json({"status":"success"});
        }
    });
};

//删除一个管理员
exports.delAdmin= function(req, res) {
    var id=req.body.id;
    console.log(id);
    Admin.remove({id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};

exports.editAdmin = function(req, res) {
    var id=req.query.id;

    console.log("wwwwwwwwwwww");
    console.log('id:'+id);
    Admin.findOne({id:id},function(err,data){

        if(err){

        }else{
            res.render("editadmin",{'data':data});
        }
      
    });
  

};
exports.toEditAdmin = function(req, res) {
    var id=req.body.id;
    var adminname=req.body.adminname;
    var adminpass=req.body.adminpass;
    console.log("-------------");
    console.log("------id-------"+id);
    console.log("-------adminname------"+adminname);
    console.log("-----adminpass--------"+adminpass);
    var whereData = {"id":id}
    var updateDat = {$set: {"adminname":adminname,'adminpass':adminpass}}; //如果不用$set，替换整条数据
    Admin.update(whereData, updateDat, function(error, result){
        if(error){
            res.json({"status":"error"})
        }else{
            // res.redirect('/admin')
           res.json({"status":"success"});
        }
    });

};
//分页获取
exports.getAdminsPage = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Admin.find({});
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
            Admin.find(function(err,result){
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
exports.getAdmins = function(req, res) {
    var curr=req.query.curr;
    //每页大小为10
    var query=Admin.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
// layui默认接受的数据格式：

//     "code": res.status, //解析接口状态
//     "msg": res.message, //解析提示文本
//     "count": res.message, //解析数据长度
//     "data": res.rows.item //解析数据列表


            //计算数据总数
            Admin.find(function(err,result){
                jsonArray={code:200,msg:'',count:result.length,data:result};
                    res.json(jsonArray);
        });
  
    }
});
}
