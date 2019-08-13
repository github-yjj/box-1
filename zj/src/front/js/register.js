//封装注册功能

(function(window){
	//创建一个类
	class Register {
		constructor() {
			//初始化
		    this.username = null;
			this.password1 = null;
			this.password2 = null;
			this.random_arr =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			this.msgtime = 0;
			this.s=null;
			this.code = '';
			this.flag1 = null;
			this.flag2 = null;
			this.flag3 = null;
			this.flag4 = null;
			this.flag5 = null;
			this.flag6 = null;
			this.flag7 = null;
			this.flag8 = null;
		}	
		//init初始化方法
		init(){
			
		}
			
		//dom为绑定的元素
		checkUser(username,dom){
				var re =/^[a-zA-Z]\w{1,11}$/; //大写字母开头,字母下划线$
				this.username = String(username);
				// console.log(arru)
				if(this.username !==''){
					if(re.test(this.username)){
						let that = this;
						ajax('post','../../admin/RegUser.php',`username=${this.username}`,function(data){
							let userdata = JSON.parse(data);
							console.log(userdata)
							if(userdata.state === 1){
								dom.innerHTML ='用户名可以使用...';
								dom.style.color = 'green';
								that.flag1=true;
								console.log(that.flag1)
								// return true;
							}else{
								dom.innerHTML ='用户名已被注册...';
								dom.style.color = 'red';
								that.flag1=false;
								// return false;
							}
						})
					}else{
						dom.innerHTML ='用户名格式有误...';
						dom.style.color = 'red';
						this.flag1=false;
						// return false;
					}
				}else{
					dom.innerHTML = '';
				}
			}
			
			
		checkPwd(password,dom){
			var re =/^\w{8,100}$/;
			this.password1 = String(password);
			// console.log(arru)
			if(this.password1 !== ''){
				if(re.test(this.password1)){
					dom.innerHTML ='密码一级棒...';
					dom.style.color = 'green';
					this.flag2=true;
					// return true;
				}else{
					dom.innerHTML ='请输入至少8位密码...';
					dom.style.color = 'red';
					this.flag2=false;
					// return false;
				}
			}else{
				dom.innerHTML = '';
			}
		}
			
			
		checkAgain(password,dom){
			this.password2 = String(password);
			// console.log(arru)
			if(this.password2 !==''){
				if(this.password2 === this.password1){
					dom.innerHTML ='两次密码相同...';
					dom.style.color = 'green';
					this.flag3 = true;
					// return true;
				}else{
					dom.innerHTML ='两次输入的密码不同...';
					dom.style.color = 'red';
					this.flag3 = false;
					// return false;
				}
			}else{
				dom.innerHTML = '';
			}
		}
		
		checkTel(tel,dom){
			var re =/^1[3456789]\d{9}$/;
			this.tel1 = String(tel);
			if(this.tel1 !==''){
				if(re.test(this.tel1)){
					dom.innerHTML ='手机号码一级棒...';
					dom.style.color = 'green';
					this.flag6=true;
					// return true;
				}else{
					dom.innerHTML ='该号码不存在...';
					dom.style.color = 'red';
					this.flag6=false;
					// return false;
				}
			}else{
				dom.innerHTML='';
			}
		}
		
		
		// 短信验证
		
		createCode(){
			var codeLength = 6; //验证码长度为6位
			for(var i=0;i<codeLength;i++){
				var charIndex = Math.floor(Math.random()*this.random_arr.length);
				this.code += this.random_arr[charIndex];
			}
		}
		
		sendMsg(omsgbtn){
			omsgbtn.disabled= true;//点击后按钮处于禁用状态
			this.msgtime =60;
			clearInterval(this.s);//每次点击按钮清除定时器和之前的验证码
			this.code='';
			this.createCode();//重新创建验证码
			alert('您的验证码为:'+this.code);
			let that = this;
			this.s=setInterval(function(){
				console.log(that.msgtime);
				if(that.msgtime>0){
					that.msgtime--;
					omsgbtn.innerHTML = '倒计时'+that.msgtime+'秒';
				}else{
					omsgbtn.disabled = false;
					omsgbtn.innerHTML = '重新获取验证码';
					// this.code = 'asdasdqweqweqadsasdaf';//时间到了之后给验证码一个错误的值,然后验证就是失败的
				}
				},1000);
				
		}
		
		jugdeMsg(dom1,dom2){
			var inputCode = dom1.value;
			// console.log(inputCode)
			if(inputCode.length <=0){
				dom2.innerHTML ='';
				dom2.style.color = 'red';
				this.flag8 = false;
			}
			else if(inputCode != this.code){
				dom2.innerHTML ='验证码错误...';
				dom2.style.color = 'red';
				this.flag8 = false;
			}else{
				dom2.innerHTML ='真棒！！！验证码正确....';
				dom2.style.color = 'green';
				this.flag8 = true;
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		 
		
		
			//dom=oRegister
		onreginster(username,password,tel,dom){
			// console.log(this.flag1)
			// console.log(this.flag2)
			// console.log(this.flag3)
			if(this.flag1 && this.flag2 && this.flag3 && this.flag6 && this.flag8){
				let data = "username=" + username + "&password=" + password + "&tel=" + tel;
				ajax('post','../../admin/Reg.php',data,function(data){
					console.log(data)
					let userdata = JSON.parse(data);
					console.log(userdata)
					if(userdata.state === 1){
						//将用户登录的情况存储在cookie当中
						let info = {
							"state":1,
							"message":"登录状态确定，将会保存七天"
						}
						alert("注册成功1s后跳转登录...");
						setTimeout(function(){
							location.assign("./login.html");
						},1000);
						
					}else{
						alert("注册失败...")
					}
				})
			}else{
				alert("请输入正确的信息...")
			}
		}
			
		onlogin(username,password){
			let data = "username=" + username + "&password=" + password;
				ajax('post','../../admin/LoginUser.php',data,function(data){
					console.log(data)
					let userdata = JSON.parse(data);
					console.log(userdata)
					if(userdata.state === 1){
						//将用户登录的情况存储在cookie当中
						let info = {
							"state":1,
							"message":"登录状态确定，将会保存七天"
						};
						//将cookie信息转化为json格式再在前端进行md5加密。防止他人模拟cookie
						// info = md5(JSON.stringify(info))
						//存储cookie
						setCookie("loginUser",username,7);
						alert("登录成功...")
						//路径从index开始计算
						setTimeout(function(){
							location.assign("../../index.html");
						},1000)
					}else{
						alert("账户或密码错误...")
					}
				})
		}	
		
	}
		 	
	window.Register = Register;
})(window);