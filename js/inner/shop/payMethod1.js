function appPay(orderCode,money,payType){
    window.jsi.appPay(payType,orderCode,money);
};
 function boolsuccess(success){
                            if(success){
                              // alert('支付成功');
                              alert(1);
                            }else{
                              // alert('支付失败');
                                 alert(2);
                            }
                      }
// function wantpay(ordrcode,money){
//                                   // alert('这个是要去支付的函数wantpaye')
//                                   window.jsi.startinterview(hsname,hspasssword,hname,img);
//                             }
 function boolsuccess(success){
                            if(success){
                              // alert('支付成功');
                              location.href='paysuccess.html';
                            }else{
                              // alert('支付失败');
                                 location.href='payfailure.html';
                            }
                      }
function goBack2(){}
$(function() {
    var ua = navigator.userAgent.toLowerCase();  

    // 返回
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $('#header').hide();
        }
        $('#goBack').on('touchstart',function(){
            goBack2();
        })
    //支付方式
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $('.zhifubao').hide();
        }
    /**
     * 获取订单号等。。
     */
    var ORDERCODE = GetQueryString('ORDERCODE')
    var REALMONEY = GetQueryString('REALMONEY')
    // var MEMBERS_ID = GetQueryString('MEMBERS_ID')
    //console.log(REALMONEY, MEMBERS_ID, ORDERCODE)
    var JianKang = JSON.parse(localStorage.getItem('JianKang') || '{}')

    if (GetQueryString('STATE')==1) {
        $('#time').html(15);
    }else if (GetQueryString('STATE')==101) {
        $('#time').html(60);
    }
    $('.payMoney').text(returnFloat(parseFloat(REALMONEY)/100))
    $('.orderName').text(ORDERCODE)
    var COM = ''
    $('.weixin').on('touchend', function() {
	    var data = JSON.stringify({
	       "ORDERCODE": ORDERCODE,
	       "REALMONEY": REALMONEY
	    })
            $.ajax({
            	headers: { 'hx_token':JianKang.TOKEN_ID},
                type: 'POST',
                url: COM + '/appuser/WXPay/GetWeiXinPaySign',
	   		    contentType: "application/json.do",
                data: data,
                dataType: 'json',
                success: function(data) {
                    console.log(data)
                         //去支付接口返回是下面几个数
                    function onBridgeReady() {
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": data.appId, //公众号名称，由商户传入     
                                "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数     
                                "nonceStr": data.nonceStr, //随机串     
                                "package": data.package,
                                "signType": "MD5", //微信签名方式：     
                                "paySign": data.paySign //微信签名 
                            },
                            function(res) {
                                //alert(res.err_msg)
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    //清空已经支付的商品
                                    alert('ok')
                                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                            }
                        );
                    }
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        onBridgeReady();
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                        }
        })
        appPay(ORDERCODE,REALMONEY,'weixin');
    })
    $('.zhifubao').on('touchend', function() {
        appPay(ORDERCODE,REALMONEY,'zhifubao');
    })

})