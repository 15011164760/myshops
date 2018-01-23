  //
  function gotolistlogin(){
            // alert(11);
        }
// 1.定义购物车模块
    var CartModule = angular.module('CartModule', []);
    // 2.定义控制器
    CartModule.controller('CartController', function($scope) {
    //得到缓存数据
    //1.先删除单个订单的缓存
    localStorage.removeItem('onlydata');
       //cart data
   // localStorage.setItem("shoploc"+goodname, {"goodname": goodname, "price": price,"imgsrc":imgsrc,"goodmodel":goodmodel ,"num":num,"good_id":good_id});
   // var aaa=localStorage.getItem("shoploc"+goodname);
   // alert(aaa);
    for (var i = 0; i < localStorage.length; i++) {
                    var localValue = localStorage.getItem(localStorage.key(i));
                    // console.log(localValue);
                    var key = localStorage.key(i);
                    // console.log(localStorage.key(i));   
                    if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                        var obj = $.parseJSON(localValue);
                         // console.log(obj);
                        var goodname = obj.goodname;
                        var num = obj.num;
                        var price = obj.price;
                        var brand = obj.brand;
                        // console.log("商品ID："+goodname + "商品数量：" + num + "商品颜色：" + price);
                    }
                }
                //kaishi得到数据
              var carAry=new Array();
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    // console.log(key);
                    var localValue = localStorage.getItem(key);
                    // console.log(localValue);
                    if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                        var obj = $.parseJSON(localValue);
                        carAry.push(obj);
                    }
                }
              var shoploc = { "carAry": carAry };
              // shoploc["carAry"]
    // console.log(shoploc["carAry"]);
    // alert(shoploc["carAry"].length);
    // 购物车页面通过详情页的这个缓存展示商品
    $scope.cartlist =shoploc["carAry"];
    //点击购物车页的立即结算的时候 获取购物车开始缓存的数据 有些已经改变 变化的抓取到
            var arr=[];
            $scope.delcart=function(){
                console.log($scope.cartlist);
                  angular.forEach($scope.cartlist,function(value,key){
                        if (value.isCheck) {
                            console.log(key);
                            arr.push($scope.cartlist[key]);
                        }
                    })
                    console.log(arr);
                    for(var i=0;i<$scope.cartlist.length;i++){
                        shoploc["carAry"][i]={
                            num:$scope.cartlist[i].num,
                            imgsrc:$scope.cartlist[i].imgsrc,
                            price:$scope.cartlist[i].price,
                            goodname:$scope.cartlist[i].goodname,
                            brand:$scope.cartlist[i].brand,
                            good_id:$scope.cartlist[i].good_id,
                            goodmodel:$scope.cartlist[i].goodmodel,
                        }
                    }
                    var pay=JSON.stringify(arr);
                    localStorage.setItem('jiesuan',pay);
                    var succ=JSON.parse(localStorage.getItem('jiesuan'));
                    console.log(succ);
                    if(succ.length>0){
                        if(GetQueryString('single')){
                           location.href="pay.html?single=1&only="+GetQueryString('only');
                        }
                        else if(GetQueryString('only')&&!GetQueryString('single')){
                            location.href="pay.html?only="+GetQueryString('only');
                        }
                        else{
                           location.href="pay.html?shop=1";
                        }
                    }
                    else{
                        new TipBox({type:'tip',iconStr:'购物车为空',colorType:'hospital',str:"<p class='thirtySix'><span>请选择商品</span></p>",Ok:'好的',hasBtn:true});
                         // new TipBox({type:'tip',str:'请选择商品',setTime:1000});  
                         // $('.msg').text('请选择商品').fadeIn(1000).fadeOut(1000);
                         // var t=setTimeout(refresh,1000);
                         //        function refresh(){
                         //         location.href="cart.html";
                         //        }
                    }
            }
            //点击结束
        /*
            功能需求分析：
            1.数量+ - 改变 
            2.删除数据
            3.计算总数量和总价格
            4.全选和全不选
         */
        
        // 减法运算
        $scope.jian = function(index){
            $scope.cartlist[index].num--;
            if ($scope.cartlist[index].num <= 1) {
                $scope.cartlist[index].num = 1;
            }
        }

        // // 加法运算
        $scope.jia = function(index){
            $scope.cartlist[index].num++;
        }
           // 删除数据
        // $(function(){
        //     var t;
        //     var isflag=false;
        //     var cancelTimeout = function() {
        //         if(t) {
        //             clearTimeout(t);
        //             t = null;
        //         }
        //     };
        //      $('.cartlistaimg,.wantbuytext').on('touchstart',function(){
        //         isflag=false;
        //     })
        //       $('.cartlistaimg,.wantbuytext').on('touchmove',function(){
        //         isflag=true;
        //     })
        //     $('.cartlistaimg,.wantbuytext').on('touchend',function(){
        //              if (isflag) {
        //                     return
        //                  }
        //           t = setTimeout(function() {
        //             new TipBox({type:'removePeople',iconStr:'删除商品',colorType:'hospital',str:"<p class='thirtySix animateA'><span>您确定删除</span><span class='color'>商品</span><span>吗？</span></p><p class='thirtySix animateB'><span class='color'>商品</span><span>已在购物车中删除！</span></p>",Ok:'确定删除',hasBtn:true,callBack:function(){
        //                          $scope.del = function(index) {
        //                             $scope.cartlist.splice(index, 1);
        //                             localStorage.removeItem('shoploc'+$scope.cartlist[index].goodname);
        //                              $scope.cartlist =shoploc["carAry"];
        //                         }
        //                     }});
        //                   cancelTimeout();
        //               }, 500);
        //     })
        // })
        // 删除数据
    // 删除数据
     // 删除数据
  // $scope.del = function(index){
  //                  // var index=index;
  //                   new TipBox({type:'removePeople',iconStr:'删除商品',colorType:'hospital',str:"<p class='thirtySix animateA'><span>您确定删除</span><span class='color'>商品</span><span>吗？</span></p><p class='thirtySix animateB'><span class='color'>商品</span><span>已在购物车中删除！</span></p>",Ok:'确定删除',hasBtn:true,callBack:function($scope){
  //                                 $scope.cartlist.splice(index,1);
  //                                localStorage.removeItem('shoploc'+$scope.cartlist[index].goodname);
  //                   }});
  //                    // $scope.cartlist.splice(index,1);
  // }                        
  window.onload=function(){
    // window.document.ontouchstart = function(e) { e.preventDefault(); };
     var shopnums = document.querySelectorAll('.shop-num');
         for(i=0;i<shopnums.length;i++){
           shopnums[i].index=i;
           shopnums[i].addEventListener('touchstart', function(e) {
              event.stopPropagation();
          });
        }
    function delfunction(classnames,index){
        var t;
        var indexord;
        var pointer = document.querySelectorAll(classnames);
        // console.log("商品长度："+pointer.length);
        var cancelTimeout = function() {
            // alert('cancel');
            if(t) {
                clearTimeout(t);
                t = null;
            }
        };
        for(i=0;i<pointer.length;i++){
          pointer[i].index=i;
          pointer[i].addEventListener('touchstart', function(e) {
                 e.preventDefault();
            this.addEventListener('touchmove',function(e){
                 // alert('move');
                  cancelTimeout();
                  return
            })
               indexord=this.index;
               // var deleatshopindex=$(this).index();
               // alert(deleatshopindex);
         
              // console.log($(this));
              var wantbuy=$(this).parent('.wantbuy').attr('goodname');
              t = setTimeout(function() {
                    new TipBox({type:'removePeople',iconStr:'删除商品',colorType:'hospital',str:"<p class='thirtySix animateA'><span>您确定删除</span><span class='color'>商品</span><span>吗？</span></p><p class='thirtySix animateB'><span class='color'>商品</span><span>已在购物车中删除！</span></p>",Ok:'确定删除',hasBtn:true,callBack:function(){
                                 localStorage.removeItem(wantbuy);
                                 // alert(wantbuy);
                                 // shoploc["carAry"].splice(indexord,1);
                                  $scope.cartlist.splice(indexord,1);
                                  location.reload();
                                        //kaishi得到数据
                                  //           var carAry=new Array();
                                  //             for (var i = 0; i < localStorage.length; i++) {
                                  //                 var key = localStorage.key(i);
                                  //                 console.log(key);
                                  //                 var localValue = localStorage.getItem(key);
                                  //                 console.log(localValue);
                                  //                 if (key != "shoploc"&&key.indexOf("shoploc")>=0) {
                                  //                     var obj = $.parseJSON(localValue);
                                  //                     carAry.push(obj);
                                  //                 }
                                  //             }
                                  //           var shoploc = { "carAry": carAry };
                                  //           // shoploc["carAry"]
                                  // console.log(shoploc["carAry"]);
                                  // // alert(shoploc["carAry"].length);
                                  // // 购物车页面通过详情页的这个缓存展示商品
                                  // $scope.cartlist =shoploc["carAry"];
                                  // // console.log(shoploc["carAry"]);
                                  // $scope.$apply(function(){
                                  //    $scope.cartlist=shoploc["carAry"];
                                  //     //     // 总数量
                                  //       $scope.sum = 0;
                                  //   //     // 总价格
                                  //       $scope.price = 0;
                                  //       angular.forEach($scope.cartlist,function(value,key){
                                  //           // 计算被选中的总价格和总数量
                                  //           if (value.isCheck) {
                                  //               $scope.sum += value.num;
                                  //               $scope.price += value.num * value.price;
                                  //               // alert(key);
                                  //               // localStorage.removeItem(localStorage.key(key));
                                  //           }
                                  //       })
                                         // // 点击全不选->所有的isCheck=false
                                         //    angular.forEach($scope.cartlist,function(value){
                                         //        value.isCheck = $scope.all;
                                         //        if($scope.all){
                                         //              $('.allselect').attr('src','../../img/shop/selected.png');
                                         //             $('.singlechoose').attr('src','../../img/shop/selected.png');
                                         //        }
                                         //        else{
                                         //            $('.allselect').attr('src','../../img/shop/choose.png');
                                         //            $('.singlechoose').attr('src','../../img/shop/choose.png');
                                         //        }
                                         //    })
                                    // });
                    }});
                  cancelTimeout();
              }, 500);
               // return false;
          });
          pointer[i].addEventListener('touchend', cancelTimeout);
          pointer[i].addEventListener('touchcancel', cancelTimeout); 
        }
    }
    delfunction('.cartlistaimg');
    delfunction('.wantbuytext');
    // $('.wantbuy').on('mouseover',function(){
    //   // alert('df');
    //     // delfunction('.cartlistaimg');
    //     delfunction('.wantbuytext');
    //  })

}//loaded
        // 当监听isCheck的值发生变化的时候，重新计算总价格和总数量
        $scope.$watch('cartlist',function(){
        //     // 总数量
            $scope.sum = 0;
        //     // 总价格
            $scope.price = 0;
            angular.forEach($scope.cartlist,function(value,key){
                // 计算被选中的总价格和总数量
                if (value.isCheck) {
                    $scope.sum += value.num;
                    $scope.price += value.num * value.price;
                    // alert(key);
                    // localStorage.removeItem(localStorage.key(key));
                }
            })
        },true)
        // 让isCheck和全选/全不选按钮挂钩
        $scope.change = function(){
            // 点击全选->所有的isCheck=true
            // 点击全不选->所有的isCheck=false
            angular.forEach($scope.cartlist,function(value){
                value.isCheck = $scope.all;
                if($scope.all){
                      $('.allselect').attr('src','../../img/shop/selected.png');
                     $('.singlechoose').attr('src','../../img/shop/selected.png');
                }
                else{
                    $('.allselect').attr('src','../../img/shop/choose.png');
                    $('.singlechoose').attr('src','../../img/shop/choose.png');
                }
            })
        }
     $scope.fun = function(index){
            // 要知道其他兄弟是否选中
            // 如果都选中，则isAll也为真
            // 如果有一个不选中，则isAll为假
            $scope.isAll = true;
            angular.forEach($scope.cartlist,function(value,key){
                if (!value.isCheck) {
                    $scope.isAll = false;
                    $('.allselect').attr('src','../../img/shop/choose.png');
                }
                if($scope.isAll){
                  $('.allselect').attr('src','../../img/shop/selected.png');  
                }
            })
               if($('.singlechoose')[index].src.indexOf('selected')==-1){
                 $('.singlechoose')[index].src='../../img/shop/selected.png';
               }
              else if($('.singlechoose')[index].src.indexOf('selected')!=-1){
                $('.singlechoose')[index].src='../../img/shop/choose.png';
              }
         }
    //         // 当监听isCheck的值发生变化的时候，重新计算总价格和总数量
            // var add=$scope.cartlist;
    $scope.$watch('cartlist',function(){
        // 总数量
        $scope.total = {sum:0,price:0,isAll:true};

        angular.forEach($scope.cartlist,function(value,key){
            // 计算被选中的总价格和总数量
            if (value.isCheck) {
                $scope.total.sum += value.num;
                // console.log($scope.total.sum);
                $scope.total.price += value.num * value.price;
            } else {
                $scope.total.isAll = false;
            }
        })
    },true)

})
$(function(){
    $('.backup').on('touchend',function(){
             // window.location.href = document.referrer;
             // window.history.go(-1);
             // location.href="shop.html";
        if(JSON.stringify(localStorage.getItem('details'))){
             window.history.go(-1);
        }
        else{
             location.href="shop.html";
          }
    })
    $('.delcartshop').on('touchend',function(event){
            event.preventDefault();
    })
    $('.nowpayit').show(1000);
     $('.nowpayit').on('touchend',function(){
          gotolistlogin();
    }) 
})

   