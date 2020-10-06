'use strict';

import mongoose from '../mongodb/db'

const Schema = mongoose.Schema;
// 图鉴表，根据等级
const ModelUser = new Schema({
  // 身份证
  cardId: String,
  // 姓名
  nickName: String,
  // 性别
  sex: String,
  // 手机号
  phone: String,
  // 号码牌
  number: String,
  // 服装上的印字
  content: String,
  // 已经打卡过的游戏
  listGamePlayed: {
    type: String,
    default: ''
  },
  // 是否领取过小礼物
  flagGiftGot: Boolean,
  recordId: {
    type: Number,
    default: 0
  },
})

export default mongoose.model('ModelUser', ModelUser);