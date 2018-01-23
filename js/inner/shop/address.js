$(function() {
    var JianKang = JSON.parse(localStorage.getItem('JianKang') || '{}');
	var reg_phone = /^1(3|4|5|7|8)\d{9}$/;  			// 手机号正则验证
	var html='';										// 用于获取添加的地址
	var html_default='';								// 用于获取添加的默认地址
	var url='';											// 添加、修改地址
	var address_id='';									// 地址id
    var isRemove=false;                                 // 判断是否触发删除键
    var ua = navigator.userAgent.toLowerCase();  
// 微信端隐藏返回
    // if(ua.match(/MicroMessenger/i)=="micromessenger") {
    //     $('header').hide();
    // }
// 返回
    $('#goBack').on('touchend',function(){
        window.history.back(); 
        // localStorage.removeItem("Address");
    })	
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
                        window.location.href = loginUrl;
//                  }});
                }
            }
        })
    }else{
        localStorage.removeItem('JianKang');
//      new TipBox({type:'tip',str:'请登录账号',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
            window.location.href = loginUrl;
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
			},
            error: function(xhr, type) {
                new TipBox({type:'error',iconStr:'系统错误',colorType:'system',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
            }

		})
		

    /**
     * 设置footer位置
     */
    $('footer').css('bottom', 0);

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
                var This=this;
                setTimeout(function(){
                    var isRe=$(This);
                    new TipBox({type:'removePeople',iconStr:'删除地址',colorType:'system',str:"<p class='thirtySix animateA'><span>您确定移除收件人为：</span><span class='color'>【"+ $(This).parent('.addressWrap').attr('data-name') +"】</span><span>的收件地址吗？</span></p><p class='thirtySix animateB'><span>您的地址已删除成功！</span></p>",Ok:'确定移除',hasBtn:true,callBack:function(){
                        window.location.reload();
                    },callBack2:function(){
                        $.ajax({
                            url:'/appuser/Personal/DeleteMemberAddressById?ADDRESSINFO_ID='+isRe.parent('.addressWrap').attr('data-id')
                        })
                    }});
                },500)
                ismove = false;
                    
            })
            $(document).on('touchstart',function(){
                $('.remove').hide();
                setTimeout(function(){
                    isRemove = false;
                },1500)
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
                var payindex=$(this).index();
                // alert(payindex);
        	    if (ismove||isTimeout||isRemove) {
        	        return
        	    }
        	    if (GetQueryString('L')){
	                var Adress = {
	                    name: $(this).attr('data-name'),
	                    tel: $(this).attr('data-tel'),
	                    address: $(this).attr('data-address'),
                        default: $(this).attr('data-default'),
	                    dataid: $(this).attr('data-id')
	                }
	                localStorage.setItem("Address", JSON.stringify(Adress));
	                // window.location.href = '../shop/pay.html';
                     if(GetQueryString('only')&&!GetQueryString('single')){
                        window.location.href = '../shop/pay.html?only='+GetQueryString('only')+'&payindex='+payindex;
                        // alert(111);
                   }
                   else if(GetQueryString('single')){
                      window.location.href = '../shop/pay.html?single=1&only='+GetQueryString('only')+'&payindex='+payindex;
                    // alert(222);

                   }else{
                     window.location.href = '../shop/pay.html?payindex='+payindex;
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
            setTimeout(function(){
                if ($('#userName').val()=='') {     
                    new TipBox({type:'tip',iconStr:'输入姓名',colorType:'system',str:"<p class='thirtySix'><span>请输入姓名！</span></p>",Ok:'好的',hasBtn:true});
                }else if ($('#tel').val()=='') {
                    new TipBox({type:'tip',iconStr:'输入手机号',colorType:'system',str:"<p class='thirtySix'><span>请输入手机号！</span></p>",Ok:'好的',hasBtn:true});
                }else if (!reg_phone.test($('#tel').val())) {
                    new TipBox({type:'error',iconStr:'填写错误',colorType:'system',str:"<p class='thirtySix'><span>您好，您的号码填写有误，</span></p><p class='thirtySix'><span> 请</span><span class='color'>【重新填写】</span><span>！</span></p>",Ok:'好的',hasBtn:true});
                }else if ($('#address').val()=='') {
                    new TipBox({type:'tip',iconStr:'输入地址',colorType:'system',str:"<p class='thirtySix'><span>请输入地址！</span></p>",Ok:'好的',hasBtn:true});
                }else{
                    var data={
                        'ADDRESS': $('#address').val(),
                        'ISDEFAULT': $('#default').attr('data-default'),
                        'NAME': $('#userName').val(),
                        'PHONENUMBER': $('#tel').val(),
                        'ADDRESSINFO_ID': address_id
                    };
                    $.ajax({
                        headers: {'hx_token': JianKang.TOKEN_ID},
                        url: url,
                        type: 'post',
                        data: data,
                        success:function(data){
                            if (url=='/appuser/Personal/updateMemberAddress') {
                                new TipBox({type:'success',iconStr:'修改成功',colorType:'system',str:"<p class='thirtySix'><span>您的地址已修改成功！</span></p>",Ok:'知道了',hasBtn:true,callBack:function(){  
                                    window.location.reload();
                                }});
                            }else{
                                new TipBox({type:'success',iconStr:'添加成功',colorType:'system',str:"<p class='thirtySix'><span>您的新地址已添加成功！</span></p>",Ok:'知道了',hasBtn:true,callBack:function(){  
                                    window.location.reload();
                                }});
                            }
                                
                        }
                    })  
                }
            },500)
        		
    	})
})