/**
 * 小程序配置文件
 */

const host = "https://xiaocaonuoche.com/wxapi/nuoche"
// const host2 = "lmbge.com/wxapi/gztai"
const config = {

  // 下面的地址配合云端 Server 工作
  host,
  host: `${host}/`,
  // 登录
  login: `${host}/denglu`,
  //团购小程序首页团购接口
  index: `${host}/tuangou`,
  //下单
  order: `${host}/order`,
  // 订单列表
  orderlist: `${host}/orderlist`,
  // 订单详情
  orderinfo: `${host}/orderinfo`,
  //地址详情
  address: `${host}/dizhi`,
  //生成二维码
getQRCode: `${host}/getQRCode`,
//支付
pay: `${host}/wxpay`,
//支付成功
  paysuccess:`${host}/paysuccess`,
  //年费支付
  pay1: `${host}/wxpay1`,
  //年费支付成功
  paysuccess1: `${host}/paysuccess1`,
  //手机管理
  shouji: `${host}/shouji`,
  //价格
  jiage: `${host}/jiage`,
  //获取年费
  nianfei: `${host}/nianfei`,
  codeInfo: `${host}/qrcodeinfo`,
  delqrcode: `${host}/delqrcode`,
  delshouji: `${host}/delshouji`,
  editshouji: `${host}/editshouji`,
  addshouji: `${host}/addshouji`,
  sqdl: `${host}/sqdl`,
  dizhi: `${host}/dizhi`,
 adddizhi: `${host}/adddizhi`,
 editdizhi: `${host}/editdizhi`,
  deldizhi: `${host}/deldizhi`,






  

};

module.exports = config