/**
 * Created by MrHuang on 2017/5/3.
 */
//默认行为
// document.addEventListener('touchstart', function(ev) {
//     ev = ev || event
//         //ev.preventDefault()
// });
//rem适配,IIFE上记得加分号，否则会报错
(function() {
    var styleNode = document.createElement('style')
    var width = document.documentElement.clientWidth
    styleNode.innerHTML = 'html {font-size:' + width / 10 + 'px}'
    document.head.appendChild(styleNode)
})()
//公众号全局登录地址
var loginUrl="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c861955f00d8166&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
//生成验证码
    function getCode() {
        var code = ((Math.random() * 10000) | 0) + ""
        console.log(code.length, code)
        return code.length == 4 ? code : getCode()
    }

//获取get传参
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var l = decodeURI(window.location.search);
	    var r = l.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
	}
/**
 * 获取天数函数，总共多少天
 */
    function dayCount(startDate,endDate) {  
        var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
        var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
        var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
        return dates;    
    }
/**
 * 时间格式转换函数
 */
    function zhuanhuanTime(time) {
        var timeStr = time.replace(/-/g, '.')
        return timeStr
    }
// 计算相隔天数
    function getTime2Time($time1, $time2){
        var time1 = arguments[0], time2 = arguments[1];
        time1 = Date.parse(time1)/1000;
        time2 = Date.parse(time2)/1000;
        var time_ = time1 - time2;
        return (time_/(3600*24));
    }
// 保留两位小数
    function returnFloat(value){
        var value=Math.round(parseFloat(value)*100)/100;
        var xsd=value.toString().split(".");
        if(xsd.length==1){
        value=value.toString()+".00";
        return value;
        }
        if(xsd.length>1){
        if(xsd[1].length<2){
         value=value.toString()+"0";
        }
        return value;
        }
    }

// 计算服务结束时间函数
    function transferCouponValueTime(yy,mm,dd,valueTime){
        var newDate = new Date(yy,mm-1,parseInt(dd)+parseInt(valueTime));
        var year = newDate.getFullYear();  
        var month = newDate.getMonth()+1<10?'0'+(newDate.getMonth()+1):newDate.getMonth()+1;  
        var day = newDate.getDate()<10?'0'+newDate.getDate():newDate.getDate();  
        return year+"-"+month+"-"+day;  
       
    } 

// 两个日期内每天的日期
    function getAll(start,end){
        var data='';
        function getDate(datestr){
            var temp = datestr.split("-");
            var date = new Date(temp[0],temp[1],temp[2]);
            return date;
        }
        var startTime = getDate(start);
        var endTime = getDate(end);
        while((endTime.getTime()-startTime.getTime())>=0){
            var year = startTime.getFullYear();
            var month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
            var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
            data+=(year+'-'+month+'-'+day+',');
            startTime.setDate(startTime.getDate()+1);
        }
        return data;
    }