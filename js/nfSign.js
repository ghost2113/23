$(function() {		
    var signFun = function() {
/*    	$.ajax({
    		url:"http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId=1&isSubmit=0",
			type:"post",
			dataType:"json",
			async:true,
			success:function(res){
				console.log("签到信息",res);
			},
			error:function(error){
				console.log(error);
			}
    	});*/

		var olDate;//后台返回线上日期
        var dateArray = []; //遍历网格		        
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
        //请求用户已经签到信息，存储到数组中去
        axios.post("http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId=1&isSubmit=0").then(function(response){
        	console.log(response.data);
    		if(response.data.msg="今天已经签到"){
    			_handle=false;
    			qiandaoFun();
    		};
    		var signList = new Array();
    		var _index;
    		response.data.signList.forEach(function(items,index){
    			if(items.signContinuousDay==1){
    				signList.push(items);
    			};
    			if(items.createDate == signList[signList.length-1].createDate){
    				_index = index;
    			};    			
    			if(index<(_index+1)){
    				dateArray.unshift(items.createDate.split(" ")[0].substr(8,2));
    			};
    		});
	    	$dateLi.each(function(index,item){	    	
		    	if((index+1-monthFirst) < myDate.getDate()){
					item.style.color = "#b2b2b2";						
		    	}			
			})
	        for (var i = 0; i < totalDay; i++) {
	        	//设置日历 日期起始位置
	            $dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));		            
	            $dateLi.eq(i + monthFirst).text(i+1);
	            //当前日期之前字体改变
	            //显示已经签到的日期
	            console.log(dateArray);
	            for (var j = 0; j < dateArray.length; j++) {
	            	console.log("ll");
	                if (i == dateArray[j]) {	
	                	console.log("ok");
	                    $dateLi.eq(i + monthFirst-1).addClass("qiandaoActive");
	                }
	            }
	        } 	        		
    	}).catch(function(error){
    		console.log(error);
    	});
    	/*$.ajax({
			url:"./json/date.json",
			type:"get",
			dataType:"json",
			async:false,
			success:function(res){
				console.log(res);
				//判断服务器签到日期是否为当前月，如果不是签到日期dataArray=[];
	    		if(res.signDate[0].substr(5,1)==(new Date().getMonth()+1)){
	    			res.signDate.forEach(function(item,index){
	    				dateArray.push(item.substr(7,2));
	    				dateList.push(item);
	    			})
	    		}else{
	    			dateArray = [];
	    			dateList=[];
	    		}
	    		//判断当前时间是否和服务器时间一致，否则不能进行签到操作
	    		var isNowTime = new Date().toLocaleDateString()==res.olDate;
				if(!isNowTime){		
					_handle = false;
					console.log("与服务器时间不一致");
				}
			},
			error:function(error){
				console.log(error);
			}
		})		*/
	   
        
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
        		//如果未签，则清空数组
    			dateList=[];
        	}
        	//签到成功之后，按签到天数显示奖励
        	[myDate.getDate()+7,myDate.getDate()+14,myDate.getDate()+21,myDate.getDate()+28].forEach(function(item,index){
        		$(".date" + item).addClass('qiandaoActive'+index);
        		/*$(".date" + item).text(_qiandaoJl[index]);*/
        	})
        	//签到成功之后，存储签到日期并向后台传送数据
  /*      	var dateFormat =  new Date().toLocaleDateString();
        	dateList.push(dateFormat);
        	axios.post("http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId=1&isSubmit=1").then(function(response){
	    		console.log(response);
	    	}).catch(function(error){
	    		console.log(error);
	    	})*/
	    	//向后台发送签到成功请求 把签到信息追加到signList数组中去
	    	axios.post("http://47.96.1.236:8080/zaotoutiao-api-home-1.0.0/sign/in?userId=1&isSubmit=0").then(function(response){
	    		console.log(response);
	    	}).catch(function(error){
	    		console.log(error);
	    	})
	    	
        }
    }();
})
