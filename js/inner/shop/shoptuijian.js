function backhome(){
 window.jsi.backhome();
}
//轮播图swiper
    $(function() {
        var mySwiper = new Swiper('.swiper-container', {
            // 方向：垂直
            // direction: 'vertical',
            // 循环
            loop: true,

            // 如果需要分页器
            pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        })
        // alert(11);
   //发送ajax到后台返回json展示商品 开始
    var JianKang=JSON.parse(localStorage.getItem('JianKang')|| '{}');
       // var data = {
       //          "CATEGORYID":"g001001",     //分类ID
       //          "currentPage": "1"      //当前页
       //      }
   // if (JianKang.TOKEN_ID) {
        $.ajax({
                headers: {'hx_token': JianKang.TOKEN_ID},
                type: 'GET',
                // url:'/appuser/Shop/GetMyShoppingOrderList',
                // url:'/appuser/Shop/GetGoodsList',
                url:'/appuser/Shop/GetRecommendGoodsList',
                // dataType:'json',
                // data: data,//要发送的数据（参数）
                success:function(data){
                    // alert(data.message);
                    // alert(JSON.stringify(data));
                    // alert(JSON.stringify(data.pd.length));
                    console.log(data.pd);
                    console.log(data.pd.length);
                    var str='';
                    for ( i = 0; i < data.pd.length; i++) {
                            var singleprice=returnFloat(data.pd[i]['PRICE']);
                            str += '<div class="shop-small-imgzhui"  data-id="'+data.pd[i].GOODS_ID+'">';
                            str += '<a href="javascript:void(0);"  class="shopimg">';
                            if(data.pd[i]['IMGURL']==undefined){
                              str += '<img src="../../img/shop/1.png" alt="" ondragstart="return false;" class="addshopimg"></a>';
                                
                            }else{
                              str += '<img src="/uploadFiles/uploadImgs/'+data.pd[i]['IMGURL']+'" alt="" ondragstart="return false;" class="addshopimg"></a>';
                            }
                            str += '<div class="shop-text"><span><a href="javascript:void(0);">'+data.pd[i]['GOODNAME']+'</a></span>';
                            str += '<span><a href="javascript:void(0);" class="shopming">规格型号：'+data.pd[i]['GOODMODEL']+'</a></span>';
                            str += '<span class="clickaddcar orange"><span>￥</span>'+singleprice+'<img src="../../img/shop/redcart.png" alt="" class="addcar"></span>';
                            str += '</div></div>';
                    }
                    //我算的
                    $('.shop-small-img').append(str);
                    addfly();
                   //移动端别用click 容易穿透 这样可以防止图片刚滑动放上就触发
                      $('.shop-small-imgzhui').on('touchstart', function() {
                                 ismove = false
                        })
                      $('.shop-small-imgzhui').on('touchmove', function() {
                                 ismove = true
                        })
                      $('.shop-small-imgzhui').on('click', function() {
                            if (ismove) {
                                return
                            }
                           id=$(this).attr('data-id');
                           location.href='details.html?only='+id;
                            ismove = false
                       })
                      //
                    //购物车飞入状态开始
                   function addfly(){
                    var offset = $("#end").offset(); 
                    var num=1;
                    var newshopnum;
                    $(".clickaddcar").on('click',function(event){
                       var index=$(this).index('.clickaddcar'); 
                       console.log(index);
                       event.stopPropagation();
                      if($('.u-flyer')){
                        $('.u-flyer').remove();
                      }
                        var addcar = $(this); 
                        var img = addcar.parents('.shop-small-imgzhui').find('.addshopimg').attr('src'); 
                                console.log(event.pageX,event.pageY);
                                console.log(img);
                                // console.log(addcar.parents('.yuesaomain'));
                                // console.log(addcar.parents('.yuesaomain').find('.selectimg'));
                        // console.log(addcar.parent().parent().parent().find('.shopimg img').attr('src'));
                        var scrollTop;
                                    // $(window).scroll(function() { 
                                            scrollTop=$(window).scrollTop(); 
                                            // alert(document.documentElement.clientWidth);
                                        // });
                        var flyer = $('<img class="u-flyer" src="'+img+'" style="z-index:1000000">'); 
                        flyer.fly({ 
                               start: { 
                                          left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
                                          top: event.pageY-scrollTop//开始位置（必填） 
                                      },
                                      end: { 
                                         left: document.documentElement.clientWidth-30, //结束位置（必填） 
                                          top: offset.top+20, //结束位置（必填） //结束位置（必填） 
                                          width: 0, //结束时宽度 
                                          height: 0 //结束时高度 
                                      }, 
                                      onEnd: function(){ //结束回调 
                                          // $("#msg").text('已成功加入购物车').show().animate({width: '15.5625rem'}, 200).fadeOut(1000); //提示信息 
                                          // $("#msgcart").html('<img src="../../img/shop/cartsuccess.png" alt="" class="cartimgsuccess"/>').show();
                                          $("#msgcart").fadeIn(1000).fadeOut(1000); //提示信息 
                                          // $('#msgcart').empty();
                                          // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
                                          // $('.u-flyer').destroy(); //移除dom 
                                      } 
                               }); 
                           //点击购物车加入缓存
                           adddata();
                              function adddata(){
                                var addtime= data.pd[index].ADDTIME;  
                                var brand= data.pd[index].BRAND; 
                                var categoryid= data.pd[index].CATEGORYID; 
                                var goodmodel= data.pd[index].GOODMODEL; 
                                var goodname= data.pd[index].GOODNAME;  
                                var goods_id= data.pd[index].GOODS_ID;  
                                var isrecommend= data.pd[index].ISRECOMMEND;  
                                var limitednum= data.pd[index].LIMITEDNUM;  
                                var marketprice= data.pd[index].MARKETPRICE; 
                                var postage= data.pd[index].POSTAGE;  
                                var price= data.pd[index].PRICE;  
                                var state= data.pd[index].STATE;  
                                var stocknum= data.pd[index].STOCKNUM; 
                                var imgsrc =data.pd[index]['IMGURL'];
                                 // num ++; //
                            var shoploc = {"stocknum":stocknum,"state":state,"postage":postage,"marketprice":marketprice,"limitednum":limitednum,"addtime":addtime,"categoryid":categoryid,"goodname": goodname, "price": price,"imgsrc":imgsrc,"goodmodel":goodmodel ,"num":1,"good_id":goods_id,"brand":brand,"isrecommend":isrecommend};
                            var shoplocString = JSON.stringify(shoploc);
                            console.log(shoplocString);
                            console.log(shoploc);
                            var keyName = "shoploc" + goodname;
                              for (var i = 0; i < localStorage.length; i++) {
                                  if (localStorage.key(i) == keyName) {
                                      //再次点击找到上次的缓存商品的数量 在加1
                                      if(JSON.stringify(localStorage.getItem("shoploc" + goodname))){
                                              newshopnum=JSON.parse(localStorage.getItem(localStorage.key(i))).num;
                                              newshopnum++;
                                              shoploc.num=newshopnum;
                                               shoplocString = JSON.stringify(shoploc);
                                      }
                                      localStorage.removeItem(keyName);
                                      localStorage.setItem(keyName, shoplocString);
                                  }
                              }
                            localStorage.setItem(keyName, shoplocString);
                          } 
                         //点击购物车加入缓存 end
                    }); 
                  }//addfly结束
                    //购物车飞入状态结束
                      //
                 }     
        })
         //发送ajax到后台返回json展示商品 jieshu
      // }
     $('#end').on('touchend', function() {
           if(huancun()>0){
             location.href="cart.html";
           }
           else{
             new TipBox({type:'tip',iconStr:'购物车为空',colorType:'hospital',str:"<p class='thirtySix'><span>请选择商品</span></p>",Ok:'好的',hasBtn:true});
              // $("#msg").text('请选择商品').show().animate({width: '13rem'}, 200).fadeOut(1000); //提示信息 
           }
        })
        $('.backup').on('touchend',function(){
            backhome();
        })
     $('img').on('dragstart',function(){
            return false;
     })
     //检测购物车数据是否为零
     function huancun(){
        var arrkong=[];
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                      arrkong.push(key);
                    }
                }
              return arrkong.length
      }//检测购物车数据是否为零
  })
