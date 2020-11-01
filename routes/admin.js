import excelPort from 'node-xlsx';
import ModelUser from '../models/ModelUser'
var express = require('express');
var router = express.Router();
var fs = require('fs')
//引入excel模块

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  let data = req.body;
  res.json({
    code: 0,
    data: {}
  }); //数据返回前端
});

router.get('/user/list', async (req, res, next) => {
  let data = req.query;
  let page = +data.page || 1;
  let size = +data.size || 20;
  let list = await ModelUser.find({}).sort({
    "ID": 1
  }).skip(size * (page - 1)).limit(size);
  let total = await ModelUser.find({}).countDocuments()
  res.json({
    code: 0,
    data: {
      list,
      pageConfig: {
        page,
        size,
        total: Math.ceil(total / size)
      }
    }
  }); //数据返回前端
});
router.post('/user/insert/multi', async (req, res, next) => {
  let data = req.body;
  await ModelUser.deleteMany({})
  await ModelUser.insertMany(
    data.list, {
      writeConcern: 0,
    }
  )
  res.json({
    code: 0,
    data: {}
  }); //数据返回前端
});

function writeExcel(datas) {

  let sheetData = [];
  let map = {
    cardId: '身份证',
    nickName: '姓名',
    sex: '性别',
    birthday: '生日',
    phone: '手机号',
    content: '服装上的印字',
    recordId: '印字订单号',
    listGamePlayed: '玩过的游戏',
    flagGiftGot: '是否领取了小礼物'
  }
  // 写入表头
  let colTitle = [];
  for (let key in map) {
    colTitle.push(map[key])
  }
  sheetData.push(colTitle)
  datas.forEach(element => {
    let colData = [];
    for (let key in map) {
      colData.push(element[key])
    }
    sheetData.push(colData)
  });

  let xlsxObj = [{
    name: 'sheet1',
    data: sheetData,
  }]
  //生成表格
  let file = excelPort.build(xlsxObj);
  return file;
}
router.get('/user/excel', async (req, res, next) => {
  let list = await ModelUser.find({});
  let file = writeExcel(list)
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=" + "list.xlsx");
  res.send(file);
});

module.exports = router;