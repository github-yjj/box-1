/*
 *author:Sword;
 *creat-by:2019-6-14 21：48;
 * jQ轮播图，需引入jQ文件
 */
/* 
html物理结构固定，名称固定，图片个数，宽度可以重设
 liwidth 图片宽度
 num 图片个数
 */

(function(window) {

	class moveMap {

		constructor(liwidth, num) {
			this.liwidth = liwidth;
			this.num = num;
			this.timer = null;
			this.index = 0;
		}

		init() {
			let that = this;
			$(".right").click(function() {
				that.Move("right");
			})
			$(".left").click(function() {
				that.Move("left");
			})
			//index() 方法返回指定元素相对于其他指定元素的 index 位置。
			$(".item").click(function() {
				that.index = $(this).index();
				that.Move("");
			})
			//当鼠标移入是停止，移出时继续
			$(".box").mouseenter(function() {
				clearInterval(that.timer);
			}).mouseleave(function() {
				that.autoMove();
			})
			
			this.autoMove();

		}

		Move(direction) {
			$('img-list').stop(false, true);
			//判断按钮
			if (direction === 'right') {
				this.index++;

				if (this.index > this.num) {
					$(".img-list").css({
						left: "0"
					})
					this.index = 1;
				}
			} else if (direction === 'left') {
				this.index--;
				if (this.index < 0) {
					$(".img-list").css({
						left: this.num * -this.liwidth
					})
					this.index = this.num-1;
				}
			}
			//因为index可以取到5，所有判断当index=5时，赋值为0
			this.doMove($('.item').eq(this.index > this.num-1 ? 0 : this.index));
			//运动
			$(".img-list").animate({
				left: this.index * -this.liwidth
			})
		}

		//图片移动小圆点跟随移动
		//dom就是我点的小圆点
		doMove(dom) {
			// console.log("domove");
			$('.active').removeClass('active');
			dom.addClass('active');
		}


		//自动播放
		autoMove() {
			clearInterval(this.timer);
			this.timer = setInterval(()=>{//setInterval里面是一个函数体，直接写this autoplay在init里面只调用了一次
				this.autoplay();
			}, 3000);
		}

		autoplay() {
			this.Move("right");
		}
		
	}
    
	window.moveMap =moveMap;

})(window);
