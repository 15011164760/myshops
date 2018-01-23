// 1.定义购物车模块
    var DetailsModule = angular.module('DetailsModule', []);

    // 2.定义控制器
    DetailsModule.controller('DetailsController', function($scope,$http) {
         $scope.num=1;
         // var loc=decodeURI(window.location.search);
         var GOODS_ID =GetQueryString('only');
         console.log(GOODS_ID);
         $http.get('/appuser/Shop/GetGoodsInfoByGoodsId?GOODS_ID='+GOODS_ID).success(function(msg){
            $scope.addtime= msg.pd.ADDTIME;  
            $scope.brand= msg.pd.BRAND; 
            $scope.categoryid= msg.pd.CATEGORYID; 
            $scope.goodmodel= msg.pd.GOODMODEL; 
            $scope.goodname= msg.pd.GOODNAME;  
            $scope.goods_id= msg.pd.GOODS_ID;  
            $scope.isrecommend= msg.pd.ISRECOMMEND;  
            $scope.limitednum= msg.pd.LIMITEDNUM;  
            $scope.marketprice= msg.pd.MARKETPRICE; 
            $scope.postage= msg.pd.POSTAGE;  
            $scope.price= returnFloat(msg.pd.PRICE);  
            $scope.state= msg.pd.STATE;  
            $scope.stocknum= msg.pd.STOCKNUM;  
            $scope.description= msg.pd.REMARK;  
            $scope.imgsrc= '/uploadFiles/uploadImgs/'+msg.IMGURL[0].PATH; 
            console.log(msg.IMGURL);
            // $scope.cartlist=msg.IMGURL;
            // alert(JSON.stringify(msg));
            var shopnumimg='';
            for(i=0;i<msg.IMGURL.length;i++){
                shopnumimg+='<div class="swiper-slide"> <a href="javascript:void(0);"><img src="/uploadFiles/uploadImgs/'+msg.IMGURL[i].PATH+'" alt=""></a> </div>';
                } 
              $('.swiper-wrapper').append(shopnumimg);
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
 // localStorage.setItem('datas',JSON.stringify(msg.pd));
              //通过缓存存储数据
                   //加缓存
                function adddata(){
                                var addtime= msg.pd.ADDTIME;  
                                var brand= msg.pd.BRAND; 
                                var categoryid= msg.pd.CATEGORYID; 
                                var goodmodel= msg.pd.GOODMODEL; 
                                var goodname= msg.pd.GOODNAME;  
                                var goods_id= msg.pd.GOODS_ID;  
                                var isrecommend= msg.pd.ISRECOMMEND;  
                                var limitednum= msg.pd.LIMITEDNUM;  
                                var marketprice= msg.pd.MARKETPRICE; 
                                var postage= msg.pd.POSTAGE;  
                                var price= msg.pd.PRICE;  
                                var state= msg.pd.STATE;  
                                var stocknum= msg.pd.STOCKNUM; 
                                // var imgsrc =msg.IMGURL[0].PATH;
                                var imgsrc =msg.pd.IMGURL;
                                var num = $scope.num; //
                                var shoploc = {"stocknum":stocknum,"state":state,"postage":postage,"marketprice":marketprice,"limitednum":limitednum,"addtime":addtime,"categoryid":categoryid,"goodname": goodname, "price": price,"imgsrc":imgsrc,"goodmodel":goodmodel ,"num":$scope.num,"good_id":goods_id,"brand":brand,"isrecommend":isrecommend};
                            var shoplocString = JSON.stringify(shoploc);
                            console.log(shoplocString);
                            var keyName = "shoploc" + goodname;
                            for (var i = 0; i < localStorage.length; i++) {
                                if (localStorage.key(i) == keyName) {
                                    localStorage.removeItem(keyName);
                                }
                            }
                            localStorage.setItem("shoploc"+goodname, shoplocString);
                            // localStorage.setItem("shoploc"+goodname, shoplocString);
                      } 
                  //缓存结束
                    //kaishi得到数据
                    function getdata(){
                      var carAry=new Array();
                        for (var i = 0; i < localStorage.length; i++) {
                            var key = localStorage.key(i);
                            console.log(key);
                            var localValue = localStorage.getItem(key);
                            console.log(localValue);
                            if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                                var obj = $.parseJSON(localValue);
                                carAry.push(obj);
                            }
                        }
                      var shoploc = { "carAry": carAry };
                    }
                      //得到结束
                      //点击加入购物车
               $('.addcart').on('touchend',function(){
                   $('.addcart').text('查看购物车');
                     //成功加入购物车提示 
                   if($('.addcart').hasClass("addcartskip")){
                         localStorage.setItem('details','1');
                        location.href='cart.html?single=1&only='+GetQueryString('only');
                   }else{
                    // $('.msg').fadeIn(1000).fadeOut(1000);
                    $("#msgcart").fadeIn(1000).fadeOut(1000); //提示信息 
                    // $("#msgcart").html('<img src="../../img/shop/cartsuccess.png" alt="" class="cartimgsuccess"/>').show().animate({width: '7rem'}, 1000).fadeOut(1000); //提示信息 
                   // new TipBox({type:'success',str:'已加入到购物车',setTime:1000});
                   // new TipBox({type:'success',str:'已加入到购物车',setTime:1000});
                    $('.addcart').addClass('addcartskip');
                     adddata();
                     getdata(); 
                   }
               })
               //kai
                //详情页面的数据通过缓存存储到订单结算页面，点击立即购买跳转到订单结算
               $('.gotobuy').on('touchend',function(){
                        //加缓存此时只有一个订单
                           // var imgsrc =msg.IMGURL[0].PATH;
                           var imgsrc =msg.pd.IMGURL;
                            var goodmodel =msg.pd.GOODMODEL;
                            var good_id =msg.pd.GOODS_ID;
                            var brand =msg.pd.BRAND; //
                            var num = $scope.num; //
                            var price = msg.pd.PRICE;
                            var goodname =msg.pd.GOODNAME;
                            var shoploc = {"goodname": goodname, "price": price,"imgsrc":imgsrc,"goodmodel":goodmodel ,"num":$scope.num,"good_id":good_id,"brand":brand};
                            var shoplocString = JSON.stringify(shoploc);
                            console.log(shoplocString);
                            var keyName = "shoploc" + goodname;
                            for (var i = 0; i < localStorage.length; i++) {
                                if (localStorage.key(i) == keyName) {
                                    localStorage.removeItem(keyName);
                                }
                            }
                            localStorage.setItem("shoploc"+goodname, shoplocString);
                            localStorage.getItem("shoploc"+goodname).num=$scope.num;
                            // var onlyshop=localStorage.getItem("shoploc"+goodname);
                            // localStorage.setItem("onlydata",onlyshop);
                            // var onlydata=JSON.parse( localStorage.getItem('onlydata'))
                            // if(onlydata!=null){
                                 localStorage.setItem('details','1');
                                location.href='cart.html?single=1&only='+GetQueryString('only');
                            // }
                        //
               })
              //购买事件结束
         })
         $scope.totalprice=  $scope.num * $scope.shoprice;
        $scope.jian=function(){
            $scope.num--;
            if ($scope.num <= 1) {
            $scope.num = 1;
            }
           // $scope.totalprice=  $scope.num * $scope.shoprice;
        }
        // 加法运算
        $scope.jia = function(index){
           $scope.num++;
           // $scope.totalprice=  $scope.num * $scope.shoprice;
        }
        //计算总价格
    })
    //点击进入购买页面
   //dianji
   $(function(){
      $('#end').on('touchend',function(){
          if(huancun()>0){
             localStorage.setItem('details','1');
             location.href="cart.html?single=1&only="+GetQueryString('only');
           }
           else{
             new TipBox({type:'tip',iconStr:'购物车为空',colorType:'hospital',str:"<p class='thirtySix'><span>请选择商品</span></p>",Ok:'好的',hasBtn:true});
             // $('.msg').text('请选择商品').fadeIn(1000).fadeOut(1000);
           }
      })
      $('.back-home').on('touchend',function(){
             // location.href="shop.html";
             window.history.go(-1);  //返回上一页
             // window.location.href = document.referrer;
             // window.history.back();  //返回上一页
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
