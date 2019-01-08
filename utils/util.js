const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return month+"月"+day+"日"
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return year + "-" + month + "-" + day + " " + hour + ":" + minute
  
  }
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//邮箱以及手机的正则表达式
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}
function gettime(res) {
	//计算出相差天数  
	var days = Math.floor(res / (24 * 3600 * 1000))
	//计算出小时数  
	var leave1 = res % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数  
	var hours = Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数  
	var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数  
	var minutes = Math.floor(leave2 / (60 * 1000));
	//计算相差秒数  
	var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数  
	var seconds = Math.round(leave3 / 1000)
	// if (num == 3) {
	// 	return days + "天" + hours + "时" + minutes + "分"
	// } else {
	// 	return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
	// }

	var time={
		days, hours, minutes, seconds
	}
	return time

}
module.exports = {
  formatTime: formatTime,
	gettime: gettime,
  formatTime2: formatTime2,
  regexConfig: regexConfig
}
