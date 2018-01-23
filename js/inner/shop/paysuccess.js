function backhome(){
 window.jsi.backhome();
}
$(function(){
	  var JianKang=JSON.parse(localStorage.getItem('JianKang')|| '{}');
  // alert(location.href);
//    // 从登陆页面跳转回来时刷新 
 window.addEventListener('pageshow', function () { 
   if (sessionStorage.getItem('key_a')) {
     window.location.reload(); 
     sessionStorage.removeItem('key_a');
   }
　　}); 
// // 判断TOKEN_ID
//  if (JianKang.TOKEN_ID) {
//         $.ajax({
//             headers: {'hx_token': JianKang.TOKEN_ID},
//             url:'/appuser/Personal/checkTokenId',
//             success:function(data){
//                 if (data=='0') {
//                  localStorage.removeItem('JianKang');
// //                  new TipBox({type:'tip',str:'登录失效，请重新登录',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
//                         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05f040924758e0ef&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect ';
// //                  }});
//                 }
//             }
//         })
//     }else{
//         localStorage.removeItem('JianKang');
// //      new TipBox({type:'tip',str:'请登录账号',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
//             window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05f040924758e0ef&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
// //      }});
//     }
//     //判断是否登录结束
    //点击设置地址的 通过缓存 开始
	$('.backhome').on('touchend',function(){
			backhome();
	})
	// alert(111);
	if(GetQueryString('ordertype')=='shop'){
		// alert(window.location.search);
		// alert(GetQueryString('GOODSORDER_ID'));
		$.ajax({
		       type: 'GET',
		       headers: {'hx_token': JianKang.TOKEN_ID},
		       // url:'/appuser/Shop/GetMyShoppingOrderList',
		       url:'/appuser/Shop/GetMyShoppingOrderItemByGOODSORDER_ID?GOODSORDER_ID='+GetQueryString('GOODSORDER_ID'),
		       success:function(msg){
		       		// $('.paymethod').text();
		       		// alert(msg);
		       		// alert(JSON.stringify(msg));
		       		$('.ordercode').text(msg.pd.ORDERCODE);
		       		if(msg.pd.PAYMENTMETHOD==-1){
		       		  $('.paymethod').text('微信');
		       		}
		       		// alert(msg.pd.NAME);
		       		$('.username').text(msg.pd.NAME);
		       		$('.ordermoney').text('￥'+msg.pd.ORDERMONEY);
			        $('.detailsbtn').on('touchend',function(){
				           location.href='shoplistdetail.html?GOODSORDER_ID='+GetQueryString('GOODSORDER_ID');
				        })
		       }
		     })
	}
	// $('body').append('<div class="blockzhezhao"></div> <div class="paysuccess zhezhaocontain"> <div> <span>订单号</span> <span class="ordercode">20202020202020</span> </div> <div> <span>支付方式</span> <span class="paymethod">支付宝</span> </div> <div> <span>订单金额</span> <span class="ordermoney">￥222.00</span> </div> <div class="detailsbtn">订单详情</div> </div>');
})
