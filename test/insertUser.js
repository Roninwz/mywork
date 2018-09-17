var User = require("../module/user.js");

/**
 * 插入
 */
function insert() {
 
    var user = new User({
        username : 'wz',                 //用户账号
        password: '123',                            //密码                   //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();