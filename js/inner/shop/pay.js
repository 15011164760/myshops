$(function(){
  var remark='';
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
 if (JianKang.TOKEN_ID) {
        $.ajax({
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Personal/checkTokenId',
            success:function(data){
                if (data=='0') {
                 localStorage.removeItem('JianKang');
//                  new TipBox({type:'tip',str:'登录失效，请重新登录',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c861955f00d8166&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect ';
//                  }});
                }
            }
        })
    }else{
        localStorage.removeItem('JianKang');
//      new TipBox({type:'tip',str:'请登录账号',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c861955f00d8166&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
//      }});
    }
//     //判断是否登录结束
    //点击设置地址的 通过缓存 开始
            $('.backup').on('touchend',function(){
                 // if(JSON.stringify(localStorage.getItem('Address'))){
                  window.history.go(-1);
                 // }
                  // location.href='cart.html';
            })
            var  FREIGHT=0;
              $.ajax({
                        type: 'GET',
                        // url:'/ApplyPOSorderApi/getSysSetupValue?KEYCODE=SHOP_EXPRESSFEE',
                        url:'/appuser/ApplyPOSorderApi/getSysSetupValue?KEYCODE=SHOP_EXPRESSFEE',
                       async:false,
                        // data: 'KEYCODE=SHOP_EXPRESSFEE',//要发送的数据（参数）
                        success:function(yunfeidata){
                            // console.log(JSON.stringify(msg));
                            // console.log(yunfeidata.pd.VALUE);
                             FREIGHT=yunfeidata.pd.VALUE;
                             // alert(FREIGHT);
                             $('#freight').text(returnFloat(FREIGHT));
                        }
                })
            $('.user-set').on('touchend',function(){
                var addr=decodeURI(window.location.search);
                // alert(addr);
                 if(GetQueryString('single')){
                     location.href="../MyPage/address.html?L=1&single=1&only="+GetQueryString('only');
                   }
                   else if(GetQueryString('only')&&!GetQueryString('single')){
                     location.href="../MyPage/address.html?L=1&only="+GetQueryString('only');
                   }
                   else{
                     location.href="../MyPage/address.html?L=1";
                   }
                   // aleret($('#field').val());
                   // if($('#field').val()!=''){
                     localStorage.setItem('remark',$('#field').val());
                     // if()
            })
             // alert($('#field').val());
              //没有就填写缓存
            if (localStorage.getItem('remark')) {
              // alert('有默认缓存');
                $('#field').val(localStorage.getItem('remark'));
                localStorage.removeItem('remark');
            }
           // //有默认缓存
           // else if (localStorage.getItem('defaultAddress')) {
           //      var Personal = JSON.parse(localStorage.getItem('defaultAddress'));
           //      $('.username').text(Personal.NAME);
           //      $('.phone').text(Personal.PHONENUMBER);
           //      $('.address').text(Personal.ADDRESS);
           //      // alert(111);
           //  }
             //没有就填写缓存
                  // if (!localStorage.getItem('Address')&&!localStorage.getItem('defaultAddress')) {
                  //   alert('请填写地址');
                  // }else{
                          // //掉地址
                    var addressid='';
                    $('.defaultimg').hide();
                    $.ajax({
                          type: 'GET',
                          async:false,
                          headers: {'hx_token': JianKang.TOKEN_ID},
                          url:'/appuser/Personal/getMemberAddressById',
                          success:function(msg){
                             if(msg.pd.length==0){
                                          localStorage.removeItem("Address");
                                          // return
                                     }
                                   var addfalse=false;
                                   if(localStorage.getItem("Address")){
                                          var addressall=JSON.parse(localStorage.getItem("Address"));
                                          for (var i = 0; i < msg.pd.length; i++) {
                                              if(msg.pd[i].ADDRESSINFO_ID==addressall.dataid){
                                                       addfalse=true;
                                                       $('.username').text(addressall.name);
                                                       $('.phone').text(addressall.tel);
                                                       $('.address').text(addressall.address);
                                                       addressid=addressall.dataid;
                                                       if(addressall.default==1){
                                                           $('.defaultimg').show();
                                                       }
                                              }
                                         }
                                      }
                                     if(!addfalse){
                                              for (var i = 0; i < msg.pd.length; i++) {
                                                  if(msg.pd[i].ISDEFAULT==1){
                                                       $('.defaultimg').show();
                                                       $('.username').text(msg.pd[i].NAME);
                                                       $('.phone').text(msg.pd[i].PHONENUMBER);
                                                       $('.address').text(msg.pd[i].ADDRESS);
                                                       addressid=msg.pd[i].ADDRESSINFO_ID;
                                                       // iddefaultaddtrss=true;
                                                  }
                                               }
                                         }
                              }
                        })//地址调取后台的默认的  没有在调取缓存 
                                  // } 
     //点击设置地址的 通过缓存 结束
              //通过购物车来的缓存 传过来有一个?getcart地址栏参数
              var jiesuan=JSON.parse( localStorage.getItem('jiesuan'));
              // alert(jiesuan.length);
              //通过详情页来的缓存 传过来有一个?only地址栏参数
              var onlydata=JSON.parse( localStorage.getItem('onlydata'));
              // alert(onlydata);
              // alert(JSON.stringify(onlydata));

              // console.log(onlydata);
              console.log(jiesuan);
                var str='';
                var loc=decodeURI(window.location.search);
                // console.log(loc.substring(1));
                //两种情况 一种是来自详情页的 一种是来自购物车的数据 判断 开始
                //来自详情页的
                // alert(loc.substring(1,5));
              if(onlydata!=null&&GetQueryString('only')){
                 // var onlyprice=onlydata.price*onlydata.num;
                  str+='<div class="newshops"><a href="javascript:void(0);">';
                     str+='<div class="newshop-img"><img src="/uploadFiles/uploadImgs/'+onlydata.imgsrc+'" alt="" ondragstart="return false;"></div>';
                     str+='<div class="newshop-intro">';
                     str+='<span>'+onlydata.goodname+'</span>';
                     str+='<span>商品介绍：'+onlydata.brand+'</span>';
                     str+='<div class="one-price">';
                     str+='<span>￥'+onlydata.price+'</span>';
                     str+='<span>X'+onlydata.num+'</span>';
                     str+='</div></div></a></div>';
                     $('.allprice').text('实付款:￥'+returnFloat(onlydata.price*onlydata.num));
              }
              //来自购物车的数据
               else if(jiesuan!=null&&GetQueryString('single')==1){
                     var allprice=0;
                      for(i=0;i<jiesuan.length;i++){
                         str+='<div class="newshops"><a href="javascript:void(0);">';
                         str+='<div class="newshop-img"><img src="/uploadFiles/uploadImgs/'+jiesuan[i].imgsrc+'" alt="" ondragstart="return false;"></div>';
                         str+='<div class="newshop-intro">';
                         str+='<span>'+jiesuan[i].goodname+'</span>';
                         str+='<span>商品介绍：'+jiesuan[i].brand+'</span>';
                         str+='<div class="one-price">';
                         str+='<span>￥'+jiesuan[i].price+'</span>';
                         str+='<span>X'+jiesuan[i].num+'</span>';
                         str+='</div></div></a></div>';
                         allprice+=jiesuan[i].price*jiesuan[i].num;
                      }

                      $('.allprice').text('实付款:￥'+returnFloat(Number(allprice) +Number( FREIGHT)));
               }
               else{
                     var allprice=0;
                      for(i=0;i<jiesuan.length;i++){
                         str+='<div class="newshops"><a href="javascript:void(0);">';
                         str+='<div class="newshop-img"><img src="/uploadFiles/uploadImgs/'+jiesuan[i].imgsrc+'" alt="" ondragstart="return false;"></div>';
                         str+='<div class="newshop-intro">';
                         str+='<span>'+jiesuan[i].goodname+'</span>';
                         str+='<span>商品介绍：'+jiesuan[i].brand+'</span>';
                         str+='<div class="one-price">';
                         str+='<span>￥'+jiesuan[i].price+'</span>';
                         str+='<span>X'+jiesuan[i].num+'</span>';
                         str+='</div></div></a></div>';
                         allprice+=jiesuan[i].price*jiesuan[i].num;
                      }
                      $('.allprice').text('实付款:￥'+returnFloat(Number(allprice) +Number( FREIGHT)));
               }
               // alert(Number(allprice) +Number( FREIGHT) );
               //两种情况 一种是来自详情页的 一种是来自购物车的数据 判断 结束
              $('.allnewshops').append(str);//得到数据进行追加
              // 删除数据
             //点击删除当前的缓存数据
            var newshopsimg=document.querySelectorAll('.newshop-img');
            //来自详情页面的数据
            //点击立即付款给后台发送ajax
            var field=document.getElementById('field');
           // function  paymeney(){
            $('.paymoney').on('touchend',function(){
                       if(addressid){
                        // alert(333);
                         shoppanduan();
                         // alert(222);
                       }else{
                          // alert('请填写地址信息');
                          new TipBox({type:'tip',iconStr:'信息补全',colorType:'hospital',str:"<p class='thirtySix'><span>请填写地址信息</span></p>",Ok:'好的',hasBtn:true});
                       }
                 remark=$('#field').val();
                function  shoppanduan(){
                    //发送ajax到后台返回json展示商品 开始
                   // if(GetQueryString('single')==1&&GetQueryString('only')){
                         // alert('single');
                         var allnum=0;
                         var totalmoney=0;
                         var arr=[];
                               for(i=0;i<jiesuan.length;i++){
                                 allnum+=jiesuan[i].num;
                                 // alert("jiesuan[i].num"+jiesuan[i].num);
                                 totalmoney+=jiesuan[i].price*jiesuan[i].num;//totalmoney全部金额（各个商品的小计金额相加的结果）
                                          a={
                                            "GOODS_ID": jiesuan[i].good_id,   //商品ID
                                            "GOODSNUMBER": jiesuan[i].num,         //购买数量
                                            "PRICE": jiesuan[i].price,                  //商品价格
                                            // "POSTAGE": 0,                  //邮费（0是包邮）
                                            "ITEMTOTALMONEY": jiesuan[i].price*jiesuan[i].num //价格乘以数量得到的总价格
                                            }
                                            console.log(a);
                                            // b+=a;
                                     arr.push(a);
                                   }  
                                   var data={
                                            "GOODSNUMBER": allnum, //  商品数量（商品加起来的总数量）
                                            "FREIGHT":FREIGHT ,    //  运费
                                            "REALMONEY": Number(totalmoney) +Number( FREIGHT)-0,    //  订单价格（减去优惠券等等）
                                            "TOTALMONEY": Number(totalmoney) +Number( FREIGHT)-0, // 总计金额=订单金额+运费-优惠金额
                                            "PRIVILEGE_ID": '',    //优惠券ID（没有可以传空，但是字段要有）
                                            "PRIVILEGEMONEY": 0,   //  优惠金额
                                            "ADDRESS":addressid,
                                            "REMARK":remark,
                                                "pd":arr
                                      };
                               // alert(JSON.stringify(data));
                               // return
                                var aaa='';
                                for(s=0;s<jiesuan.length;s++){
                                   aaa+=jiesuan[s].goodname+'*'+jiesuan[s].num+',';
                                }
                                var newaaa=aaa.substring(aaa.length-1,0);
                              data.ABSTRACT=newaaa;
                              //去掉逗号
                              data.ABSTRACT.substring(aaa.length-1);
                              
                                    $.ajax({
                                                type: 'POST',
                                                headers: {'hx_token': JianKang.TOKEN_ID},
                                                // url:'/appuser/Shop/GetMyShoppingOrderList',
                                                url:'/appuser/Shop/AddGoodsOrder',
                                                contentType: "application/json.do",
                                                data: JSON.stringify(data),//要发送的数据（参数）
                                                success:function(data){
                                                   $.ajax({
                                                            type: 'GET',
                                                            headers: {'hx_token':JianKang.TOKEN_ID},
                                                            // url:'/appuser/Shop/GetMyShoppingOrderList',
                                                            url:'/appuser/Shop/GetMyShoppingOrderItemByGOODSORDER_ID?GOODSORDER_ID='+data.pd.GOODSORDER_ID,
                                                            // dataType:'json',
                                                            // data: data,//要发送的数据（参数）
                                                            success:function(msg){
                                                             // alert(JSON.stringify(msg));
                                                              //清除购物车缓存
                                                               var locationarr=[];
                                                                 for (var i = 0; i < localStorage.length; i++) {
                                                                        var localValue = localStorage.getItem(localStorage.key(i));
                                                                        var key = localStorage.key(i);
                                                                        if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                                                                             locationarr.push(key);
                                                                        }
                                                                    }  
                                                                    // alert(locationarr);
                                                                  for(i=0;i<locationarr.length;i++){
                                                                       localStorage.removeItem(locationarr[i]);
                                                                  } 
                                                              //清除购物车缓存end
                                                              //清除留言
                                                              localStorage.removeItem('remark');
                                                              //
                                                               //
                                                          location.href='../conment/payMethod.html?ORDERCODE=' + msg.pd.ORDERCODE + '&REALMONEY=' + msg.pd.REALMONEY*100 + '&STATE='+msg.pd.STATE+'&ordertype=shop'+'&GOODSORDER_ID='+data.pd.GOODSORDER_ID;
                                                             }
                                                        })
                                                }
                                        })
                                     //发送ajax到后台返回json展示商品 结束
                       }//shoppanduan函数             
            })//点击事件结束
        // }//paymeney function

                                  // paymeney();//有没有地址我都执行  没地址提示去加地址
})