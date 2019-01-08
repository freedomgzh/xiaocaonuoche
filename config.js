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
};

module.exports = config