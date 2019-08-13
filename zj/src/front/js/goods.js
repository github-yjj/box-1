//css样式暂时不写,先写js,已经通过a href传值id;
//现在要的是获取id对数据进处理
//ajax请求json数据
//获取后和href拿到的id进行对比,找到该id对应的信息
//根据信息创建标签插入
//然后根据标签写css样式

$(function() {
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	}
	//接收URL中的参数goods_id
	var id = getUrlParam('goods_id');
	console.log('id:' + id);
	$.ajax({
		type:'get',
		url:'../../data/goods.json',
		dataType:'json',
		success:function(res,status){
			console.log("状态"+status);
			// console.log("数据"+res.goods_list.data[0].goods_id)
			$.each(res.goods_list.data,function(idx,val){
				//根据id获取详情数据
				if(id == val.goods_id){
					// console.log("数据"+val.goods_id)
					//主图
					var str = "<img src ='"+val.image_url1+"'/><img src ='"+val.image_url2+"'/><img src ='"+val.image_url3+"'/><img src ='"+val.image_url4+"'/>"
					// console.log('index:'+idx);
					// 放大镜图片
					var strfdj = "<img src ='"+val.image_url1+"'/><img src ='"+val.image_url2+"'/><img src ='"+val.image_url3+"'/><img src ='"+val.image_url4+"'/><img src ='"+val.image_url1+"'/>"
					//小图
					var str1 = "<img src ='"+val.image_url1+"'/>";
					var str2 = "<img src ='"+val.image_url2+"'/>";
					var str3 = "<img src ='"+val.image_url3+"'/>";
					var str4 = "<img src ='"+val.image_url4+"'/>";
					var otitle = val.short_name;
					var otip4 = val.active_name;
					var opri2 =	val.good_price;
					var opri4 = val.market_price;
				}
				 
				$('.left_box1').append(str);
				$(".big_box1").append(strfdj);
				$('.box2_img1').append(str1);
				$('.box2_img2').append(str2);
				$('.box2_img3').append(str3);
				$('.box2_img4').append(str4);
				$('.title').text(otitle);
				$('.tip4').text(otip4);
				$('.pri2').text(opri2);
				$('.pri4').text(opri4);
				
			});
		}
	})
	
	//主图下面的小图，点击切换大图
	$(".left_box2>div").click(function(){
		var index = $(this).index();
		$(".left_box1>img:eq("+ index +")").siblings("img").hide();
		$(".left_box1>img:eq("+ index +")").show();
		
		//放大镜部分
		$(".big_box1>img:eq("+ index +")").siblings("img").hide();
		$(".big_box1>img:eq("+ index +")").show();
	})
	
	//放大镜
	$(".left_box1").mouseover(function(){
		$('.mask').css({
			display:"block"
		})
		$('.big_box1').css({
			display:"block"
		})
	}).mouseout(function(){
		$('.mask').css({
			display:"none"
		})
		$('.big_box1').css({
			display:"none"
		})
	})
	//移动遮罩，计算放大镜位移
	let x=0;
	let y=0;
	$('.left_box1').mousemove(function(env){
		var env =env || window.event;
		//遮罩距离父元素的距离
		x= env.pageX - $('.left_box1').offset().left - $('.mask').width()/2;
		y= env.pageY - $('.left_box1').offset().top - $('.mask').height()/2;
		//进行判断，让遮罩在盒子里面移动
		if(x<0){
			x=0;
		}else if(x>$('.left_box1').width() - $('.mask').width()){
			x=$('.left_box1').width() - $('.mask').width();
		}
		
		if(y<0){
			y=0;
		}else if(y>$('.left_box1').height() - $('.mask').height()){
			y=$('.left_box1').height() - $('.mask').height();
		}
		
		//将坐标给遮罩
		$('.mask').css({
			left:x+"px",
			top:y+"px"
		})
		
		////大盒子中图片移动的距离是和遮罩移动成比例的
		var x1 = $('.big_box1').width()/$('.left_box1').width();
		var y1 = $('.big_box1').height()/$('.left_box1').height();
		$('.big_box1>img').css({
			left:-x*x1+'px',
			top:-y*y1+'px'
		})
		
		// console.log($('.left_box1').offset().top);
		// console.log($('.left_box1').offset().left);
		// console.log(env.pageX);

	})
	
	//点击立即抢购存入cookie
	var arr = [];
	var goodid =getCookie("goods_id");
	arr.push(goodid);
	arr.push(id);
	$('.tip3_btn').click(function(){
		
		setCookie("goods_id",arr,7);
	})

	
	
	
	//数组的去重
	function uniq(array){
	    var temp = []; //一个新的临时数组
	    for(var i = 0; i < array.length; i++){
	        if(temp.indexOf(array[i]) == -1){
	            temp.push(array[i]);
	        }
	    }
	    return temp;
	}
	var id2 =uniq(id1)
	var id_num =id2.length-1;
	console.log(id_num);
	$('.right_num').text(id_num);
	$('.tip3_btn').click(function(){
		$('.right_num').text(id_num+1);
	// var num =arr.split(",");
	// console.log(num.length);
	setCookie("id_num",id_num,7);
	})
	
	
	
	
	
})
