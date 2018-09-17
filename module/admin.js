/**
 * 用户信息
 */
var mongoose = require('../config/mongodb.js'),
    Schema = mongoose.Schema;

var AdminSchema = new Schema({
    id: {type:String},
    adminname: { type: String }, //用户账号
    adminpass: { type: String }, //密码
    logindate: { type: Date } //最近登录时间
});
//生成module
module.exports = mongoose.model('Admin', AdminSchema);