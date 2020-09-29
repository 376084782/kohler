var express = require('express');
import ModelUser from '../models/ModelUser'
var router = express.Router();

/* GET home page. */
router.post('/doSubmit', async (req, res, next) => {
  let data = req.body;
  let dataDB = await ModelUser.findOne({
    nickName: data.nickName,
    cardId: data.cardId
  })
  console.log(dataDB, data)
  if (dataDB) {
    if (dataDB.content) {
      res.json({
        code: -1,
        message: '您已定制过赛服，请勿重复提交。'
      });
    } else {
      await ModelUser.updateOne({
        content: data.content,
        // 性别
        sex: data.sex,
        // 手机号
        phone: data.phone,
        // 号码牌
        number: data.number,
      })
      res.json({
        code: 0,
        data: {
          id: data.number,
          content: data.content
        }
      });
    }
  } else {
    res.json({
      code: 9999,
      message: '您信息填写有误或未报名此次活动，无法定制赛服。'
    });
  }
});

router.post('/login', async (req, res, next) => {
  let data = req.body;
  let dataDB = await ModelUser.findOne({
    nickName: data.nickName,
    cardId: data.cardId
  })
  if (dataDB) {
    res.json({
      code: 0,
      data: {
        nickName: data.nickName,
        cardId: data.cardId
      }
    });
  } else {
    res.json({
      code: 9999,
      message: '您信息填写有误或未报名此次活动'
    });
  }
});
router.post('/scan', async (req, res, next) => {
  let data = req.body;
  let dataDB = await ModelUser.findOne({
    cardId: data.cardId
  })
  console.log(dataDB)
  if (dataDB) {
    let listGamePlayed = dataDB.listGamePlayed.split(',');
    if (listGamePlayed.indexOf(data.gameId) > -1) {
      res.json({
        code: -1,
        message: '您已经打过卡了'
      });
    } else {
      listGamePlayed.push(data.gameId);
      await dataDB.updateOne({
        listGamePlayed: listGamePlayed.join(',')
      })
      res.json({
        code: 0,
        data: {

        }
      });
    }
  } else {
    res.json({
      code: 9999,
      message: '您信息填写有误或未报名此次活动'
    });
  }
});
router.post('/played', async (req, res, next) => {
  let data = req.body;
  let dataDB = await ModelUser.findOne({
    cardId: data.cardId
  })
  console.log(dataDB)
  if (dataDB) {
    res.json({
      code: 0,
      data: dataDB
    });
  } else {
    res.json({
      code: 9999,
      message: '您信息填写有误或未报名此次活动'
    });
  }
});
router.post('/check', async (req, res, next) => {
  let data = req.body;
  let dataDB = await ModelUser.findOne({
    cardId: data.cardId
  })
  if (dataDB) {
    if (dataDB.flagGiftGot) {
      res.json({
        code: -1,
        message: data.cardId + '已经领取过奖励'
      });
    } else {
      await ModelUser.updateOne({
        flagGiftGot: true
      })
      res.json({
        code: 0,
        message: data.cardId + '验证成功'
      });
    }
  } else {
    res.json({
      code: 9999,
      message: '您信息填写有误或未报名此次活动'
    });
  }
});
export default router;