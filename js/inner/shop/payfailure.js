$(function(){
	$('.backhome').on('touchend',function(){
		location.href='shop.html';
	})
	$('.repeatbtn').on('touchend',function(){
		window.history.back();       
	})
})