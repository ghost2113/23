		
    var signFun = function() {
		//获取Url地址中userId参数
		function getUrlParams(name) { 
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
		    var r = window.location.search.substr(1).match(reg);  
		    if (r != null) return unescape(r[2]); 
		    return null; 
		};		
		var userID = getUrlParams("userId");
		console.log({"用户userId":userID,"地址":window.location.search});
		var olDate;//后台返回线上日期
        var dateArray = []; //遍历网格	
        var dateM = [];
        var dateList = [];//定义空数组,存储已经签到日期，向后台传送
        var $dateBox = $("#js-qiandao-list"),
            $currentDate = $(".current-date"),
            $qiandaoBtn = $("#qiandaoBtn"),
            _html = '',//填充表格网格           
            _handle = true,//判断
            myDate = new Date();	
        	$currentDate.text(myDate.getFullYear() + '年' + parseInt(myDate.getMonth() + 1) + '月' + myDate.getDate() + '日');
        var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay();		
        var d = new Date(myDate.getFullYear(), parseInt(myDate.getMonth() + 1), 0);
        var totalDay = d.getDate(); //获取当前月的天数
        var len = (totalDay + monthFirst)>35?42:35;//网格个数
        for (var i = 0; i < len; i++) {
            _html += ' <li><div class="qiandao-icon"></div></li>'
        }
        $dateBox.html(_html) //生成日历网格
        var $dateLi = $dateBox.find("li");
        
        
        //是否请求到用户信息，模拟日历 false
        if(userID==null){_handle=false;}//如果没有用户userID禁止签到
    	for (var i = 0; i < totalDay; i++) {
        	//设置日历 日期起始位置
            $dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));		            
            $dateLi.eq(i + monthFirst).text(i+1);        
       } 
        //请求用户已经签到信息，存储到数组中去
        axios.post("http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId="+userID+"&isSubmit=0").then(function(response){
        	console.log(response.data);
    		if(response.data.msg!="今天还没签到"){
    			_handle=false;
    			qiandaoFun();
    		};
    		var signList = new Array();
    		var _index;
			//判断是否有签到日期
			console.log("已经签到数组",response.data.signList);			

			if(!response.data.signList){
				console.log("kong");
				dateArray=[];
			}else{	
				response.data.signList.forEach(function(items,index){    			
    				dateArray.push(items.createDate.split(" ")[0].substr(8,2));
    			});    			
				/*dateArray.unshift(response.data.signList[i].createDate.split(" ")[0].substr(8,2));*/
				console.log("签到渲染数组1",dateArray);
			}	
	    	$dateLi.each(function(index,item){	    	
		    	if((index+1-monthFirst) < myDate.getDate()){
					item.style.color = "#b2b2b2";						
		    	}			
			});
	    	console.log("签到渲染数组",dateArray);
/*		    dateArray.forEach(function(items,index){
	        	if(dateArray[index]==parseInt(dateArray[index+1])+1){
	        		dateM.unshift(items);
	        	}
	        });*/
	       for(var k=0;k<dateArray.length;k++){
       			if(dateArray[k]==parseInt(dateArray[k+1])+1){
	        		dateM.unshift(dateArray[k]);
	        		console.log(dateArray[k]);
        		}	       		
	       }
	       dateM.unshift(dateArray[dateM.length]);
	        console.log("dateM",dateM);
	        for (var i = 0; i < totalDay; i++) {	        	
	        	//设置日历 日期起始位置
	            $dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));		            
	            $dateLi.eq(i + monthFirst).text(i+1);
	            //当前日期之前字体改变
	            //显示已经签到的日期	
	            for (var j = 0; j < dateM.length; j++) {	            	
	                if (i == dateM[j]) {		                	
	                    $dateLi.eq(i + monthFirst-1).addClass("qiandaoActive");
	                    //签到成功之后，按签到天数显示奖励			 
	                }
	            }
	        } 
	        //渲染持续签到奖励
           	[parseInt(dateM[0])+7,parseInt(dateM[0])+14,parseInt(dateM[0])+21,parseInt(dateM[0])+28].forEach(function(item,index){
        		$(".date" + item).addClass('qiandaoActive'+index);
	        })
    	}).catch(function(error){
    		console.log(error);
    	});
           
        //判断当前日期是否已经签到,如果未签到添加可签到标记 class='able-qiandao'
        if($(".date" + myDate.getDate()).hasClass('qiandaoActive')){
        	_handle = false;
        	console.log("今天是否签到");
        }else{
        	$(".date" + myDate.getDate()).addClass('able-qiandao');
        };
        //点击网格日期签到
        $dateBox.on("click", "li", function() {
    		if(!_handle){
    			return false;
    		};
    		//判断点击日期是否为当前日期
    		if($(this).text()==myDate.getDate()){
    			qiandaoShow();
            	qiandaoFun();    
    		}               		              
        }) 
        //点击按钮签到
        $qiandaoBtn.on("click", function() { 
        	signIn("100");
    		if(!_handle){
    			return false;
    		};
        	qiandaoShow();
			qiandaoFun();		                            
        }); 
        //签到按钮样式
        function qiandaoFun() {
            $qiandaoBtn.addClass('btnActived');
            $qiandaoBtn.text("明日再来签到");           
        }  	
        //签到成功后的操作
        function qiandaoShow(){ 
        	_handle = false;
        	//判断签到日期前一天是否未签
    	    if($(".date" + myDate.getDate()-1).hasClass("qiandaoActive")){
    			$(".date" + myDate.getDate()).addClass('qiandaoActive');
        	}else{
        		$(".date" + myDate.getDate()).addClass('qiandaoActive').siblings().removeClass('qiandaoActive');
        		
        	}
			
	    	//向后台发送签到成功请求 把签到信息追加到signList数组中去
	    	axios.post("http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId="+userID+"&isSubmit=1")
	    	.then(function(response){
	    		console.log(response);
	    		if(response.data.msg=="未连续签到，从头开始签到"){
	    			console.log("未连续签到，从头开始签到");
	    			$(".qiandaoActive0").removeClass("qiandaoActive0");
	    			$(".qiandaoActive1").removeClass("qiandaoActive1");
	    			$(".qiandaoActive2").removeClass("qiandaoActive2");
	    			$(".qiandaoActive3").removeClass("qiandaoActive3");
	    			//渲染持续签到奖励
		           	[myDate.getDate()+7,myDate.getDate()+14,myDate.getDate()+21,myDate.getDate()+28].forEach(function(item,index){
		        		$(".date" + item).addClass('qiandaoActive'+index);
			        		/*$(".date" + item).text(_qiandaoJl[index]);*/
			        })
	    		}
	    		var getGold = response.data.getGold;
	    		console.log(getGold);
	    		signIn(getGold);	
	    		
	    	}).catch(function(error){
	    		console.log(error);
	    	})
        }
        function signIn(getGold){    
	       var u = navigator.userAgent;
	       var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	       var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	       if(isAndroid){
	            alert('是否是Android：'+isAndroid);
	           window.jsi.signIn(getGold)
	       }else if(isiOS){
	            alert('是否是iOS：'+isiOS);
	           window.webkit.messageHandlers.signIn.postMessage(getGold);
	       }
		}        
    }();
