// JavaScript Document
$(function() {
    var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
    var len = $("#focus ul li").length; //获取焦点图个数
    var index = 0;
    var picTimer;

    //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for (var i = 0; i < len; i++) {
        btn += "<span></span>";
    }
    //btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";//添加上下翻页按钮
    $("#focus").append(btn);
    $("#focus .btnBg").css("opacity", 0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#focus .btn span").css("opacity", 0.4).mouseover(function() {
        index = $("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseover");

    //上一页、下一页按钮透明度处理
    $("#focus .preNext").css("opacity", 0.2).hover(function() {
        $(this).stop(true, false).animate({"opacity": "0.5"}, 300);
    }, function() {
        $(this).stop(true, false).animate({"opacity": "0.2"}, 300);
    });

    //上一页按钮
    $("#focus .pre").click(function() {
        index -= 1;
        if (index == -1) {
            index = len - 1;
        }
        showPics(index);
    });

    //下一页按钮
    $("#focus .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        showPics(index);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $("#focus ul").css("width", sWidth * (len));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#focus").hover(function() {
        clearInterval(picTimer);
    }, function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 3000); //此4000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
        $("#focus ul").stop(true, false).animate({"left": nowLeft}, 300); //通过animate()调整ul元素滚动到计算出的position
        //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
        $("#focus .btn span").stop(true, false).animate({"opacity": "0.4"}, 300).eq(index).stop(true, false).animate({"opacity": "1"}, 300); //为当前的按钮切换到选中的效果
    }
});







$(document).ready(function() {
    $(window).resize(function() {//窗口变化时

        windowalign();//弹出框
        windowalign2();//弹出框

        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            windowalign3();//新手礼包弹出
        }
        show();//回到顶部
    });


    weixin()//微信隐藏
    //微信关闭
    $("#wx_c").click(function() {
        $(this).parent().hide();
        //$(".w3c").css("right","10px")
        $(".w3c").animate({right: 10}, 300, 'easeInQuad');
        //$(".box").stop(true,false).animate({left : 0},1500,'easeOutElastic');
        //return;
    });

    //微信隐藏
    function weixin() {
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            //var w_h=$(window).height()-$(document).scrollTop()+"px"
            //$('.').css({"bottom": w_h})
            $(".weixin").hide();
        } else {
            $(".weixin").show();

        }
    }

    show();//回到顶部
    $(window).scroll(function() {
        show();//回到顶部

    });

    // function weixin_top(){
//		 if($(".weixin").is("hide")){
//			 $(".w3c").animate({right:10},300,'easeInQuad');
//			 }else{
//				  $(".w3c").animate({right:160},300,'easeInQuad');
//				 }
//		 }



    //鼠标经过图
//    $('.sib_box li .img_img').mouseenter(function() {
//        $(this).children('.tishi2').addClass("tishi");
//        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
//            $(this).children('.tishi2').children('.img_bg').css({background: "none repeat scroll 0 0 #000", height: "201px;", position: "absolute", left: "0", bottom: "0"});
//        }
//    }).mouseleave(function() {
//        $(this).children('.tishi2').removeClass("tishi")
//        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
//            $(this).children('.tishi2').children('.img_bg').removeAttr("style");
//        }
//    });
    $('.sib_box li .img_img').live("mousemove mouseout", function(event) {
        if (event.type == "mousemove") {
            $(this).children('.tishi2').addClass("tishi");
            return;
            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                $(this).children('.tishi2').children('.img_bg').css({background: "none repeat scroll 0 0 #000", height: "201px;", position: "absolute", left: "0", bottom: "0"});
            }
        } else {
            $(this).children('.tishi2').removeClass("tishi");
            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                $(this).children('.tishi2').children('.img_bg').removeAttr("style");
            }
        }
    });


    //首页左边栏最新开服
    $(".server_page").find("a").mousemove(function() {
        var index = $(this).index();
        $(".server_page a").removeClass("curr");
        $(this).addClass("curr");
        $(".zxkf:visible").hide();
        $(".zxkf").eq(index).show();
    });

    //首页左边栏游戏服务器列表
    $(".game_svr_tle").mouseenter(function() {
        var index = $(".game_server:visible").index();
        if (($(this).next('.game_server').index()) === index)
            return;
        if (!$(".game_server").is(":animated")) {
            $(".game_server:visible").slideToggle("fast");
            $(this).next('.game_server').slideToggle("fast");
        }
    });

    //首页综合，新闻，公告，合服切换
    $(".news_tab a").mousemove(function() {
        var index = $(this).index();
        if ($(this).hasClass("more"))
            return;
        $(".news_tab a").removeClass("curr");
        $(this).addClass("curr");
        $(".news_con:visible").hide();
        $(".news_con").eq(index).show();
    });

    //新闻页面全部游戏切换
    $(".selt,.selt_li").mouseenter(function() {
        $(".selt_li").show();
    }).mouseleave(function() {
        $(".selt_li").hide();
    });


    //弹出框居中

    windowalign();
    windowalign2();
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        windowalign3();//新手礼包弹出
    }


    function windowalign() {
        var topx = Math.max(0, (($(window).height() - $(".alrt").outerHeight()) / 2) - 10) + "px";
        var topy = Math.max(0, (($(window).width() - $(".alrt").outerWidth()) / 2) + 10) + "px";
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            $(".alrt").css({"top": topx, "left": topy});
        } else {
            $(".alrt").css("top", topx);
            $(".alrt").css("left", topy);
        }
        $(".alrt_bg").css("width", $(window).width());
        $(".alrt_bg").css("height", $(document.body).outerHeight(true));
    }
    function windowalign2() {
        var topx = Math.max(0, (($(window).height() - $(".page_mar1").outerHeight()) / 2) - 10) + "px";
        var topy = Math.max(0, (($(window).width() - $(".page_mar1").outerWidth()) / 2) + 10) + "px";
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            $(".page_mar1").css({"top": topx, "left": topy});
        } else {
            $(".page_mar1").css("top", topx);
            $(".page_mar1").css("left", topy);
        }
        $(".alrt_bg").css("width", $(window).width());
        $(".alrt_bg").css("height", $(document.body).outerHeight(true));
    }

    //新手礼包弹出
    function windowalign3() {
        var topx = Math.max(0, (($(window).height() - $(".ding_con").outerHeight()) / 2) - 10) + "px";
        var topy = Math.max(0, (($(window).width() - $(".ding_con").outerWidth()) / 2) + 10) + "px";

        $(".ding_con").css("top", topx);
        $(".ding_con").css("left", topy);
        $(".maxk").css("width", $(window).width());
        $(".maxk").css("height", $(document.body).outerHeight(true));

        $(".jqmOverlay").bind("click", function() {
            $("#card_Box").css("display", "none")

        });

    }




});

//回到页面顶部

var goto_top_type = -1;
var goto_top_itv = 0;
function goto_top_timer() {
    var y = goto_top_type == 1 ? document.documentElement.scrollTop : document.body.scrollTop;
    var moveby = 15;
    y -= Math.ceil(y * moveby / 50);
    if (y < 0) {
        y = 0;
    }
    if (goto_top_type == 1) {
        document.documentElement.scrollTop = y;
    } else {
        document.body.scrollTop = y;
    }
    if (y == 0) {
        clearInterval(goto_top_itv);
        goto_top_itv = 0;
    }
}
function goto_top() {
    if (goto_top_itv == 0) {
        if (document.documentElement && document.documentElement.scrollTop) {
            goto_top_type = 1;
        } else if (document.body && document.body.scrollTop) {
            goto_top_type = 2;
        } else {
            goto_top_type = 0;
        }
        if (goto_top_type > 0) {
            goto_top_itv = setInterval('goto_top_timer()', 50);
        }
    }
}
function show() {
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        $(".w3c").hide();
    } else {
        if ($(document).scrollTop() < 600 || $(window).width() < 1200) {
            $(".w3c").fadeOut("fast");

        } else {
            $(".w3c").fadeIn("slow");
        }
    }
    ;
}


function xsk_close() {
    $(".page_mar1").hide();
    $(".alrt_bg").hide();
}