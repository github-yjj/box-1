//百度搜索
//1.绑定id
let oList = document.getElementById('list');
let q = document.getElementById('q');
let btn = document.getElementById('btn');
// console.log(oList)
// console.log(q)
// console.log(btn)


//2.点击按钮获取输入框中的数据,将数据拼接上地址,点击提交含有数据的地址
btn.onclick = function() {
	let info = q.value;
	// console.log(info);
	let url = "http://www.baidu.com/s?wd=" + info;
	window.location.assign(url);
}

//3.键盘按键拿起时,jsonp方式引入后端数据,并拼接地址发送到后端,
q.onkeyup = function() {
	oList.style.display = 'block';
	if (this.value != "") {
		let script = document.createElement('script');
		//调用百度的api
		script.src = "http://suggestion.baidu.com/su?wd=" + this.value + "&cb=fn";
		document.body.appendChild(script);
	} else {
		oList.style.display = 'none';
	}
}
//4.后端接收到请求后,我们利用回调函数,拿回数据执行函数.
function fn(data) {
	console.log(data);
	let html = '';
	if (data.s.length) {
		for (let i = 0; i < data.s.length; i++) {
			html += `<li><a href="http://www.baidu.com/s?wd=${data.s[i]}">${data.s[i]}</a></li>`;
		}
		oList.innerHTML = html;
	} else {
		oList.style.display = 'none';
	}
}



//ajax请求json数据
$(function() {

	$.ajax({
		type: 'get',
		url: 'data/goods.json',
		dataType: 'json',
		success: function(res) {
			 // var str = "<div class='content_item'>"; 
			 var str ='';
			 var str1 ='';
			 var str2 ='';
			 var str3 ='';
			 var strq = '';
			 var val =res.goods_list.data;
			 // console.log(val[i].goods_id)
			 // console.log(val[i])
			 // 热门
			 for(var i=0;i<8;i++){
				 str += "<a href=\"front/pages/goods.html?goods_id= "+ val[i].goods_id +"\"><div class=\"content_item\"><div class=\"item1\"><img src=\""+ val[i].image_url1 +"\" ></div><div class=\"item2\"><h4>"+val[i].goods_name+"</h4><h6>"+val[i].normal_price+"</h6><h3>"+val[i].xc_name+"</h3><ul><li><a href=\"javascript:;\">询价</a></li><li><a href=\"javascript:;\">试驾</a></li></ul></div></div></a>";
				 }
				 
			// 优惠
			for(var q=9;q<17;q++){
							 strq += "<a href=\"front/pages/goods.html?goods_id= "+ val[q].goods_id +"\"><div class=\"content_item\"><div class=\"item1\"><img src=\""+ val[q].image_url1 +"\" ></div><div class=\"item2\"><h4>"+val[q].goods_name+"</h4><h6>"+val[q].normal_price+"</h6><h3>"+val[q].xc_name+"</h3><ul><li><a href=\"javascript:;\">询价</a></li><li><a href=\"javascript:;\">试驾</a></li></ul></div></div></a>";
				 }
			 //二级菜单
			 for(var j=0;j<6;j++){
				 str1 +='<div class="ulitem_1">'+
									'<img src="'+ val[j].image_url1 +'" >'+
								'</div>'
			 }
			 for(var a=3;a<8;a++){
			 				 str2 +='<div class="ulitem_1">'+
			 									'<img src="'+ val[a].image_url1 +'" >'+
			 								'</div>'
			 }
			 for(var b=12;b<15;b++){
			 				 str3 +='<div class="ulitem_1">'+
			 									'<img src="'+ val[b].image_url1 +'" >'+
			 								'</div>'
			 }
			 
			 
			 // 
			 
			// str += "</div>";
			$('#content_i').append(str);
			$('#content_y').append(strq);
			$('#banner_item').append(str1);
			$('#banner_item2').append(str2);
			$('#banner_item3').append(str3);
		}
	})
})

// ==============选项卡功能===========
$('#main_remen').mouseover(function(){
	$('#content_y').hide();
	$('#content_i').show();
})
$('#main_youhui').mouseover(function(){
	$('#content_i').hide();
	$('#content_y').show();
})


//===============获取用户名的cookie============
var loginUser = getCookie("loginUser");
if(loginUser == ''){
	$('#presonalUser').text("您好，请登录")
	$('#cancellation').text("免费注册")
	$('#cancellation').attr('href','./front/pages/register.html')
}
if(loginUser != ''){
	$('#presonalUser').text("尊敬的用户："+loginUser+"　您好")
	$('#cancellation').text("退出登陆")
	$('#cancellation').attr('href','./front/pages/login.html')
	$('#cancellation').click(function(){
		getCookie("loginUser",0,-1);
		// 修改a标签的属性
	})
}




