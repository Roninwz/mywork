/**
 * 用户信息
 */
var mongoose = require('../config/mongodb.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String }, //用户账号
    password: { type: String }, //密码
    logindate: { type: Date } //最近登录时间
});
//生成module
module.exports = mongoose.model('User', UserSchema);