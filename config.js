/**
 * 小程序配置文件
 */

const host = "https://xiaocaonuoche.com/wxapi/nuoche"
// const host2 = "lmbge.com/wxapi/gztai"
const config = {

  // 下面的地址配合云端 Server 工作
  host,
  host: `${host}/`,
  login: `${host}/denglu`,
  index: `${host}/tuangou`,
  order: `${host}/order`,
  orderlist: `${host}/orderlist`,
  orderinfo: `${host}/orderinfo`,
  address: `${host}/dizhi`,
getQRCode: `${host}/getQRCode`,
pay: `${host}/wxpay`,
  paysuccess:`${host}/paysuccess`,
  pay1: `${host}/wxpay1`,
  paysuccess1: `${host}/paysuccess1`,
  paysuccess2: `${host}/paysuccess2`,
  shouji: `${host}/shouji`,
  jiage: `${host}/jiage`,
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
  mrdizhi: `${host}/mrdizhi`,
  userinfo: `${host}/userinfo`,
  duanxinfei: `${host}/duanxinfei`,
  jdmdr: `${host}/jdmdr`,
  xdmdr: `${host}/xdmdr`,
  gxmdr: `${host}/gxmdr`,
  bdshouji: `${host}/bdshouji`,
  wxphone: `${host}/wxphone`,

  bindAxB: `${host}/bindAxB`,
  bindAxB: `${host}/bindAxB`,

  tongzhi: `${host}/tongzhi`,
  xgshouji: `${host}/xgshouji`,
  mrshouji: `${host}/mrshouji`,

};

module.exports = config