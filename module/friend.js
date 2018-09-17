var mongoose = require('../config/mongodb.js'),
    Schema = mongoose.Schema;

var FriendSchema = new Schema({
    id: {type: String},
    friendname: { type: String }, //朋友名
    tel: {type: String},//tel
    qq: {type: String},//qq
    email: {type: String},
    age: { type: Number}, //朋友年龄
    birthday: {type: Date},//生日
    address: {type: String},//地址
    sex: { type:Number},//性别
    adddate: { type: Date } //添加时间
});
//生成module
module.exports = mongoose.model('Friend', FriendSchema);