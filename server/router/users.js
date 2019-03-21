const express=require("express");
const router=express.Router();
router.post('/login',(req,res) => {
  console.log('login')
  console.log(req.body)
  console.log('username:'+req.body.username)
  if (req.body.username == "admin") {
    res.send ({
      resultCode: '000000',
      resultMesg: '登录成功',
      data:{
        adminToken: 'asdfghjkl123333333'
      }
    })
  } else {
    res.send({
      resultCode: '000001',
      resultMesg: '用户名或者密码错误',
    })
  }
})

router.post('/permission',(req,res) => {
  res.send({
    resultCode: '000000',
    resultMesg: '读取权限成功',
    data:[
      "manager/login",
      "organization/query",
      "organization/team_model_manager",
      "user_info_manager/agent_info_query",
      "user_info_manager/agent_roll_manager",
      "user_info_manager/agent_dimission_manager",
      "user_permission_manager/agent_permission_manager",
      "uesr_resouces_manager/user_resource_view",
      "security/logger_view",
      "security/mobile-functions",
      "report/export"
    ]
  })
})

router.get('/searchInfo',(req,res) => {
  var input = req.query.input
  var type = req.query.type
  console.log(input)
  console.log(type)
  res.send({
    resultCode: '000000',
    resultMesg: '搜索成功',
  })
})
module.exports=router;