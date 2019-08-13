 //首先获取cookie值
 //ajax请求数据
 //然后根据cookie获取的id值,去匹配数据
 //匹配正确后,拿出数据,插入.
 
 
 $(function(){
	 
	 //获取cookie值
	 var arr = getCookie('goods_id');
	 var id =arr.split(",");
	 // console.log(id.length-1)
	 //购物车里面物品数量
	 $('.right_num').text(id.length-1);
	// console.log(id[1]);
	//ajax请求数据
	$.ajax({
		type:'get',
		url:'../../data/goods.json',
		dataType:'json',
		success:function(res,status){
			
			$.each(res.goods_list.data,function(idx,val){
	// 			//根据id获取详情数据
			for(var i=1;i<id.length;i++){
				if(id[i] == val.goods_id){
				// // 				var str = "<img src ='"+val.image_url1+"'/><img src ='"+val.image_url2+"'/><img src ='"+val.image_url3+"'/><img src ='"+val.image_url4+"'/>"
				// // 				
				// // 				var otitle = val.short_name;
								var str = '<tr>'+
												'<td>'+val.goods_name+'</td>'+
												'<td><img src ="'+val.image_url1+'"></td>'+
												'<td>'+val.buy_price+'</td>'+
												'<td><button id="btn11">+</button><span id="txt11">0</span><button id="btn22">-</button></td>'+
												'<td>'+val.short_name+'</td>'+
											'</tr>'
							
				}
			}
				
				
				$('tbody').append(str);
	// // 			
	// // 			$('.title').text(otitle);
				
		
			});
			//重点
			//切记
			//调用这个函数//由于异步，所以要实例化这个对象，必须要在标签创建完毕后执行，不然部分数据可能读取不到。
			let a =new Goods();
			a.init();
		},
		
	})
	
	// ====================== ajax内容结束===================
	 
	 
	 //=================== ES6计算商品价格并存储cookie=============
	 class Goods{
		 
		 constructor() {
			 this.table =null;
		     this.num = null;
			 this.price = null;
			 this.cutPrice = null;
		 }
		 
		 //初始化方法
		 init(){
			 this.table = document.getElementsByTagName('table')[0];
			 this.shopGoodsNum();
			 this.carBuy();
			 // console.log(111)
		 }
		 
		 //定义2个工具函数，方便商品按钮使用
		 goods_add(num){
		 	return Number(num) + 1;
		 }
		 goods_sub(num){
		 	if(Number(num)<1){
		 		return num=0;
		 	}
		 	return Number(num)-1;
		 }
		 
		 
		 shopGoodsNum(){
		 	//商品个数，表格行数
		 	let goods = this.table.children[1].children;
			console.log(goods)
			console.log(goods.length)
		 	//通过循环对每一行按钮进行处理
		 	for (let i=0;i<goods.length;i++) {
		 		let num = goods[i].children[3].children[1];
		 		let add = goods[i].children[3].children[0];
		 		let sub = goods[i].children[3].children[2];
		 		//将this赋值给that,this是全局的，赋值给that,方便下面使用
		 		let that = this;
		 		// console.log(num.innerHTML);
		 		console.log(num);
		 		add.onclick = function(){
		 			num.innerHTML = that.goods_add(num.innerHTML);
		 			that.setGoodsCookie();
		 			that.carBuy();
		 		};
		 		sub.onclick = function(){
		 			num.innerHTML = that.goods_sub(num.innerHTML);
		 			that.setGoodsCookie();
		 			that.carBuy();
		 		};
		 	}
			
		 }
		 
		 //将最终的价格存储到cookie当中
		 setGoodsCookie(){
		 	//获取商品数量
		 	let goods = this.table.children[1].children;
		 	let end_price =0;
		 	//通过循环找到price和num
		 	for (let i=0;i<goods.length;i++) {
		 		this.price = Number(goods[i].children[2].innerHTML);
		 		this.num = Number(goods[i].children[3].children[1].innerHTML);
		 	
		 		if(this.num>=0){
		 			//商品最终价格
		 			end_price += this.price * this.num;
		 			//获取上一次的cookie值，在上一次的基础上增加
		 			let info = getCookie('a_goods_num_price');
		 			//进行判断
		 			if(info ===""){
		 				setCookie("a_goods_num_price",this.price,10);
		 			}else{
		 				//切换页面是判断cutPrice是否有值，如果没有表示新开的页面，把price值存进去，
		 				//如果有值表示切换的页面，要把之前页面的cutPrice的值赋值进去。如果是切换的页面，cutPrice肯定有值。
		 				//在点击切换店铺时给cutPrice赋值
		 				this.cutPrice =getCookie('cutPrice');
		 				if(this.cutPrice === ""){
		 					setCookie("a_goods_num_price",end_price,10);
		 				}else{
		 					// setCookie("a_goods_num_price",Number(this.cutPrice)+ end_price,10);
		 				}
		 			}
		 			
		 		}
		 	}	
		 }
		 
		 
		 //结账//显示金钱信息
		 carBuy(){
		 	let info = document.getElementById('btn_2');
		 	
		 	let shop_price = getCookie('a_goods_num_price');
		 	
		 	if(shop_price === ""){
		 		info.innerHTML = "立即结账";
		 	}else{
		 		let price = Number(getCookie('a_goods_num_price'));
		 		console.log(price)
		 		info.innerHTML = `结账(当前金额${price}元)`;
		 	}
		 } 
		 
		 
		 
	 }
	 
	 
	 
	 
	  //=================== ES6计算商品价格并存储cookie=============
	 
	 
	 
	 
	 
	 
	 //==============================点击弹出付款===============
	 
	 $('#btn_2').click(function(){
		 $('.payM').css({
			 display:"block"
		 })
	 })
	 $('#removes').click(function(){
		 $('.payM').css({
		 	display:"none"
		 })
	 })
	 
	 //============================清空购物车=========================
	 $('#btn_1').click(function(){
		 setCookie("goods_id",1,-1);
		 setCookie("a_goods_num_price",1,-1);
		 location.reload();
	 })
	 
	 
	 
	 
	 
 })
 