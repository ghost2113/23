
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 640) {
				/*docEl.style.fontSize = '100px';*/
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
			}
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/**
 * 完美解决safari、微信浏览器下拉回弹效果和上拉空白的bug
 * @param {Object} el 滑动元素
 */
var overscroll = function(el) {  
    el.addEventListener('touchstart', function() {  
        var top = el.scrollTop  
        ,totalScroll = el.scrollHeight  
        ,currentScroll = top + el.offsetHeight;  
        if(top === 0) {  
            el.scrollTop = 1;  
        }else if(currentScroll === totalScroll) {  
            el.scrollTop = top - 1;  
        }  
    });  
  
    el.addEventListener('touchmove', function(evt) {  
    if(el.offsetHeight < el.scrollHeight)  
        evt._isScroller = true;  
    });  
}  
          
overscroll(document.querySelector('#main'));  
document.body.addEventListener('touchmove', function(evt) {  
    if(!evt._isScroller) {  
        evt.preventDefault();  
    }  
});  