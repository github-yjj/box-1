// ============限时秒杀==============
function TimeDown(id, endDateStr) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    // document.getElementById(id).innerHTML = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    //延迟一秒执行自己
	
	if(days<0){
		days = 0;
	}
	if(hours<0){
		hours = 0;
	}
	if(minutes<0){
		minutes = 0;
	}
	if(seconds<0){
		seconds = 0;
	}
	
	
	
	
	$('.d').text(days);
	$('.h').text(hours);
	$('.m').text(minutes);
	$('.s').text(seconds);
	
	
	
	
    setTimeout(function () {
        TimeDown(id, endDateStr);
    }, 1000)
}



//ajax请求json数据
$(function() {
	console.log(111111)
	$.ajax({
		type: 'get',
		url: '../../data/goods.json',
		dataType: 'json',
		success: function(res) {
			var str = '';
			$.each(res.goods_list.data, function(idx, val) {
				str += "<a href=\"goods.html?goods_id= " + val.goods_id +
					"\"><div class=\"content_item\"><div class=\"item1\"><img src=\"" + val.image_url1 +
					"\" ></div><div class=\"item2\"><h4>" + val.goods_name + "</h4><h6>" + val.normal_price + "</h6><h3>" +
					val.xc_name +
					"</h3><ul><li><a href=\"javascript:;\">询价</a></li><li><a href=\"javascript:;\">试驾</a></li></ul></div></div></a>";

			});

			$('#content_i').append(str);
		}
	})
})