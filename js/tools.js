String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function() {
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function() {
    return this.replace(/(\s*$)/g,"");
}

// 日期格式化 
// 使用例： alert(new Date().format("yyyy-MM-dd")); 
// 使用例： alert(new Date("january 12 2008 11:12:30").format("yyyy-MM-dd hh:mm:ss")); 
Date.prototype.format = function(format) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}
	if(/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

// 浏览器判断
function currentBrowser() {
	 var Sys = {};
     var ua = navigator.userAgent.toLowerCase();
     var s;
     (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
     (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
     (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
     (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
     (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
     
     if (Sys.ie) return 'IE: ';
     if (Sys.firefox) return 'Firefox: ';
     if (Sys.chrome) return 'Chrome: ';
     if (Sys.opera) return 'Opera: ';
     if (Sys.safari) return 'Safari: ';
}

// 货币格式化
function currencyFormat(price) {
	price = setScale(price, veivo.priceScale, veivo.priceRoundType);
	return veivo.currencySign + price + veivo.currencyUnit;
}

//金额大写转换函数
function currencyUppercase(n) { 
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "ERR";
	var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
	n += "00";
	var p = n.indexOf('.');
	if(p >= 0)
		n = n.substring(0, p) + n.substr(p+1, 2);
	unit = unit.substr(unit.length - n.length);
	for(var i=0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	var ret = str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
	if(ret == "" || ret == "分" || ret == "零分")
		ret = "零元";
	return ret;
}

//浮点数加法运算
function floatAdd(arg1, arg2) {
	var r1, r2, m;
	try{
		r1 = arg1.toString().split(".")[1].length;
	}catch(e) {
		r1 = 0;
	}
	try{
		r2 = arg2.toString().split(".")[1].length;
	}catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

//浮点数减法运算
function floatSub(arg1, arg2) {
	var r1, r2, m, n;
	try{
		r1 = arg1.toString().split(".")[1].length;
	}catch(e) {
		r1 = 0
	}
	try{
		r2 = arg2.toString().split(".")[1].length;
	}catch(e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//浮点数乘法运算
function floatMul(arg1, arg2){
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try{
		m += s1.split(".")[1].length;
	}catch(e) {}
	try{
		m += s2.split(".")[1].length;
	}catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//浮点数除法运算
function floatDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;    
	try{
		t1 = arg1.toString().split(".")[1].length;
	}catch(e) {}
	try{
		t2 = arg2.toString().split(".")[1].length;
	}catch(e) {}
	with(Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

//设置数值精度
function setScale(value, scale, roundingMode) {
	if(roundingMode.toLowerCase() == "roundhalfup") {
		return (Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	}else if(roundingMode.toLowerCase() == "roundup") {
		return (Math.ceil(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	}else {
		return (Math.floor(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
	}
}

function redirectUrl(url) {
	if(url)
		window.location.href = url;
//	else
//		window.history.back();
	
}
function reloadPage() {
	window.location.reload(true);
}
