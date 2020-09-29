'use strict';

import mongoose from '../mongodb/db'

const Schema = mongoose.Schema;
// 图鉴表，根据等级
const ModelUser = new Schema({
  // 身份证
  cardId: Number,
  // 姓名
  nickName: String,
  // 性别
  sex: Number,
  // 手机号
  phone: Number,
  // 号码牌
  number: Number,
  // 服装上的印字
  content: String,
  // 已经打卡过的游戏
  listGamePlayed: {
    type: String,
    default: ''
  },
  // 是否领取过小礼物
  flagGiftGot: Boolean,
})

export default mongoose.model('ModelUser', ModelUser);