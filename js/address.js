$(function() {
    var JianKang = JSON.parse(localStorage.getItem('JianKang') || '{}');
	var reg_phone = /^1(3|4|5|7|8)\d{9}$/;  			// 手机号正则验证
	var html='';										// 用于获取添加的地址
	var html_default='';								// 用于获取添加的默认地址
	var url='';											// 添加、修改地址
	var address_id='';									// 地址id
    var isRemove=false;                                 // 判断是否触发删除键
	
// 从登陆页面跳转回来时刷新	
	window.addEventListener('pageshow', function () { 
		if (sessionStorage.getItem('key_a')) {
			window.location.reload(); 
			sessionStorage.removeItem('key_a');
		}
　　}); 
// 判断TOKEN_ID
	if (JianKang.TOKEN_ID) {
        $.ajax({
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Personal/checkTokenId',
            success:function(data){
                if (data=='0') {
                	localStorage.removeItem('JianKang');
//                  new TipBox({type:'tip',str:'登录失效，请重新登录',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05f040924758e0ef&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
//                  }});
                }
            }
        })
    }else{
        localStorage.removeItem('JianKang');
//      new TipBox({type:'tip',str:'请登录账号',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05f040924758e0ef&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
//      }});
    }
    
    close();
    popUpShow_new();
    popUpShow_change();
    remove();
       
	// 获取地址
		$.ajax({
			headers: {'hx_token': JianKang.TOKEN_ID},
			url:'/appuser/Personal/getMemberAddressById',
			success:function(data){
				for (var i = 0; i < data.pd.length; i++) {
					if (data.pd[i].ISDEFAULT==1) {
						html_default="<div class='addressWrap' data-name='" + data.pd[i].NAME + "' data-tel='" + data.pd[i].PHONENUMBER + "' data-address='" + data.pd[i].ADDRESS + "' data-default='" + data.pd[i].ISDEFAULT + "' data-id='" + data.pd[i].ADDRESSINFO_ID + "'>\
        							    <p class='addressP1'><span class='name'>" + data.pd[i].NAME + "</span><span class='tel'>" + data.pd[i].PHONENUMBER.substring(0,3) + "****" + data.pd[i].PHONENUMBER.substring(7) + "</span><img class='moren' src='../../img/MyPage/address/moren.png'></p>\
        							    <p class='addressP2'><img class='addressIcon' src='../../img/MyPage/address/addressIcon.png'><span class='addressName'>" + data.pd[i].ADDRESS + "</span></p>\
        							    <img class='remove' src='../../img/MyPage/remove.png'>\
                                        <img class='footerImg' src='../../img/MyPage/address/fs.png'>\
        							</div>";
        				localStorage.setItem('defaultAddress', JSON.stringify(data.pd[i]));
					}else if (data.pd[i].ISDEFAULT==0) {
						html= html + "<div class='addressWrap' data-name='" + data.pd[i].NAME + "' data-tel='" + data.pd[i].PHONENUMBER + "' data-address='" + data.pd[i].ADDRESS + "' data-default='" + data.pd[i].ISDEFAULT + "' data-id='" + data.pd[i].ADDRESSINFO_ID + "'>\
						        	    <p class='addressP1'><span class='name'>" + data.pd[i].NAME + "</span><span class='tel'>" + data.pd[i].PHONENUMBER.substring(0,3) + "****" + data.pd[i].PHONENUMBER.substring(7) + "</span></p>\
						        	    <p class='addressP2'><img class='addressIcon' src='../../img/MyPage/address/addressIcon.png'><span class='addressName'>" + data.pd[i].ADDRESS +"</span></p>\
						        	 <img class='remove' src='../../img/MyPage/remove.png'>\
                                    </div>";
					}
				}
				$('.wrap').html(html_default + html);
			}

		})
		

    /**
     * 设置footer位置
     */
    $('footer').css('top', $(window).height() - $('footer').height());

    // 关闭
    	function close() {
        	var ismove = false;
        	$('.closeBtn').on('touchstart', function() {
        	    ismove = false;
        	})
        	$('.closeBtn').on('touchmove', function() {
        	    ismove = true;
        	})
        	$('.closeBtn').on('touchend', function(ev) {
        	    if (ismove) {
        	        return;
        	    }
        	    $('input').blur();
    		    $('#changeAddress').hide();
    		})
    	}

    // 删除
        function remove() {
            var ismove = false;
            $(document).on('touchstart','.remove', function() {
                ismove = false;
            })
            $(document).on('touchmove','.remove', function() {
                ismove = true;
            })
            $(document).on('touchend','.remove', function(ev) {
                if (ismove) {
                    return;
                }
                var isRe=$(this);
                new TipBox({type:'tip',str:"确定删除收件人为："+ $(this).parent('.addressWrap').attr('data-name') +"的收件地址？",setTime:10000500,hasBtn:true,tipOk:'确定',tipNo:'取消',callBack:function(){  
                    $.ajax({
                        url:'/appuser/Personal/DeleteMemberAddressById.do?ADDRESSINFO_ID='+isRe.parent('.addressWrap').attr('data-id'),
                        success:function(data){
                            new TipBox({type:'success',str:'成功删除该地址',hasBtn:true});
                            window.location.reload();
                        }
                    })
                }});
            })
            $(document).on('touchstart',function(){
                $('.remove').hide();
                setTimeout(function(){
                    isRemove = false;
                },500)
            })
            $(document).on('touchstart','.remove',function(event){
                event.stopPropagation();
            })
        }

    // 打开新增地址
    	function popUpShow_new() {
        	var ismove = false;
        	$('footer').on('touchstart', function() {
        	    ismove = false;
        	})
        	$('footer').on('touchmove', function() {
        	    ismove = true;
        	})
        	$('footer').on('touchend', function(ev) {
        	    if (ismove||isRemove) {
        	        return;
        	    }
        	    $('input').blur();
    			url='/appuser/Personal/addMemberAddress';
    			address_id='';
    			$('#userName').val('');
    			$('#tel').val('');
    			$('#address').val('');
    			$('#default').attr('src','../../img/MyPage/address/btn-1.png');
    			$('#default').attr('data-default','0');
    			$('#changeAddress').show();
    		})
    	}

    // 打开修改地址
    	function popUpShow_change() {
        	var ismove = false;
            var isTimeout = false;
        	$('.wrap').on('touchstart','.addressWrap', function() {
                ismove = false;
                if ($('.remove').css('display')!='inline') {                                //  删除键
                    isTimeout = false;
                }
                var timeOut=setTimeout(function(){
                    isTimeout = true;
                    isRemove = true;
                    $('.remove').show();
                },500);
                $(this).on('touchmove',function(){
                    clearTimeout(timeOut);
                })
                 $(this).on('touchend',function(){
                    clearTimeout(timeOut);
                })
        	})
        	$('.wrap').on('touchmove','.addressWrap', function() {
        	    ismove = true;
        	})
        	$('.wrap').on('touchend','.addressWrap', function(ev) {
        	    if (ismove||isTimeout||isRemove) {
        	        return
        	    }
        	    if (GetQueryString('L')){
	                var Adress = {
	                    name: $(this).attr('data-name'),
	                    tel: $(this).attr('data-tel'),
	                    address: $(this).attr('data-address'),
	                    default: $(this).attr('data-default')
	                }
	                localStorage.setItem("Address", JSON.stringify(Adress));
	                window.location.href = '../shop/pay.html';
                   if(GetQueryString('only')){
                        window.location.href = '../shop/pay.html?only='+GetQueryString('only');
                   }
                   else if(GetQueryString('getcart')){
                      window.location.href = '../shop/pay.html?getcart='+GetQueryString('getcart');

                   }
	            }else{
	            	$('input').blur();
	    			url='/appuser/Personal/updateMemberAddress';
	    			address_id=$(this).attr('data-id');
	    			$('#userName').val($(this).attr('data-name'));
	    			$('#tel').val($(this).attr('data-tel'));
	    			$('#address').val($(this).attr('data-address'));
	    			if ($(this).attr('data-default')==0) {
						$('#default').attr('src','../../img/MyPage/address/btn-1.png');
	    				$('#default').attr('data-default','0');
	    			}else if ($(this).attr('data-default')==1) {
	    				$('#default').attr('src','../../img/MyPage/address/btn-2.png');
	    				$('#default').attr('data-default','1');
	    			}	
	    			$('#changeAddress').show();
	           	}    
    		})
    	}

    // 默认设置
    	$('#default').on('touchend',function(){
    		if ($(this).attr('data-default')==0) {
    			$(this).attr('src','../../img/MyPage/address/btn-2.png');
    			$(this).attr('data-default','1');
    		}else{
    			$(this).attr('src','../../img/MyPage/address/btn-1.png');
    			$(this).attr('data-default','0');
    		}
    	})

    // 保存地址
    	$('#btn_save').on('touchend',function(){
        	$('input').blur();
    		if ($('#userName').val()=='') {																//验证表单
    			new TipBox({type:'tip',str:'请输入姓名',dbBtn:false,hasBtn:true});
    		}else if ($('#tel').val()=='') {
    			new TipBox({type:'tip',str:'请输入手机号',dbBtn:false,hasBtn:true});
    		}else if (!reg_phone.test($('#tel').val())) {
    			new TipBox({type:'tip',str:'请输入正确的手机号',dbBtn:false,hasBtn:true});
    		}else if ($('#address').val()=='') {
    			new TipBox({type:'tip',str:'请输入地址',dbBtn:false,hasBtn:true});
    		}else{
    			var data={
    				'ADDRESS': $('#address').val(),
    				'ISDEFAULT': $('#default').attr('data-default'),
    				'NAME': $('#userName').val(),
    				'PHONENUMBER': $('#tel').val(),
    				'ADDRESSINFO_ID': address_id
    			};
                new TipBox({type:'tip',str:'确认保存地址?',setTime:10000500,hasBtn:true,callBack:function(){  
                    $.ajax({
                        headers: {'hx_token': JianKang.TOKEN_ID},
                        url: url,
                        type: 'post',
                        data: data,
                        success:function(data){
                            new TipBox({type:'success',str:data.message,setTime:10000500,hasBtn:true,callBack:function(){  
                                    window.location.reload();
                                }});
                        }
                    })
                }});
    			    
    		}
    	})
})