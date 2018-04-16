// tab切换
function tabs(tabTit,tabCon,on){
	$(tabCon).each(function(){
		$(this).children().eq(0).show();
	});
	$(tabTit).children().click(function(){
		$(this).addClass(on).siblings().removeClass(on);
		var index = $(tabTit).children().index(this);
		$(tabCon).children().eq(index).show().siblings().hide();
	});	
}

// 轮播
$(document).ready(function() {zSlider();	
	function zSlider(ID,delay){
		var ID = ID?ID:"#zSlider";
		var delay = delay?delay:5000;
		var index = 0,leng = $("#select_btn li").size(),autoScrollFUN;
		move();
		function move(){
			$("#select_btn li").removeClass("current");
			$("#picshow li").fadeOut(500);
			$("#select_btn li").eq(index).addClass("current");
			$("#picshow li").eq(index).fadeIn(1000);
		}
		autoScrollFUN = setTimeout(autoScroll,delay);
		function autoScroll(){
			clearTimeout(autoScrollFUN);
			index++;
			if (index>leng-1) {index=0;};
			move();
			autoScrollFUN = setTimeout(autoScroll, delay);
		}
		$('#picshow').hover(function(){
			clearTimeout(autoScrollFUN);
		}, function(){
			autoScrollFUN = setTimeout(autoScroll, delay);
		});		
		$('#select_btn li').hover(function(){
			clearTimeout(autoScrollFUN);
			var picEQ=$('#select_btn li').index($(this));
			if (picEQ==index) return false;
			index = picEQ;			
			move();
			return false;
		}, function() {
			autoScrollFUN = setTimeout(autoScroll,delay);
		});
		
	}

	
});







