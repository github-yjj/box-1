//ajax请求json数据
$(function() {

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
