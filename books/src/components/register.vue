<template>
	<div id="register">
		<mt-header title="注册">
			<mt-button icon="back" slot="left" @click="goBack">&nbsp;&nbsp;</mt-button>
			<router-link to="/login"  slot="right" >
				<mt-button class="login_icon">登录</mt-button>
			</router-link>
		</mt-header>
		<section>
			<div class="logo">
				<img src="../assets/fox.png" alt="fox">
			</div>
			<label for="account">请输入邮箱号</label><br>
			<div class="login_info">
				<input type="text" name="account" id="eml" v-model="user"><br>
			</div>
			<label for="password">请设置密码</label><br>
			<div class="login_info">
				<input type="password" name="password" v-model="pwd">
			</div>
			
			<div class="clearfix">
				<div class="fl check_code" style="width:150px">验证码<input type="text">
				</div>
				<div class="fr">
					<!-- <input type="button" value="获取验证码" class="code"> -->
				<mt-button class="code" @click="send" :disabled="show" >
					<span v-if="sendMsgDisabled" >{{time+'秒后获取'}}</span>
  					<span v-if="!sendMsgDisabled" >获取验证码</span>
				</mt-button>	
					

				</div>		
			</div>
		</section>
		<div class="btn">
			<input type="button" value="注册" class="login_btn" @click="register(user,pwd)">
		</div>
		<div class="or"><p>OR</p></div>
		<div class="social">
			<table>
				<tr>
					<td><img src="../assets/qq.png" alt=""></td>
					<td><img src="../assets/wechat.png" alt=""></td>
					<td><img src="../assets/weibo.png" alt=""></td>
				</tr>
			</table>	
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default{
		name:"register",
		data(){
			return{
				user:'',
				pwd:'',
				sendMsgDisabled:false,
				time:10,
				interval:'',
				show:false
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			register(user,pwd){
				var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var emailUrl = document.getElementById('eml');
				if(re.test(emailUrl.value)){
					this.$store.dispatch("setUser",user);
				this.$store.dispatch("setPwd",pwd);
				MessageBox.confirm('确定注册?').then(action => {
					this.$router.push({path:'/login'})	
    			});
			}else{
				MessageBox('waring','邮箱格式有误！')
			}
				
			},
			send() {
   			 	this.sendMsgDisabled = true;
   			 	this.show = true;
    			this.interval = setInterval(() => {
    		 	if ((this.time--) <= 0) {
     		 		this.time = 10;
      				this.sendMsgDisabled = false;
      				this.show = false;
     		 		window.clearInterval(this.interval);
    		 		}
    			}, 1000);
  		 	}
		}
	}	
</script>
<style scoped>
	.mint-header{
		background-color: white;
		color: rgb(35,38,43);
	}
	.logo{
		margin-top: 30px;
		text-align: center;
		margin-bottom: 50px;
	}
	.logo img{
		width: 15%;
	}
	.btn,.login_info{
		text-align: center;
	}
	section{
		color: rgb(144,144,144);
		margin-top: 50px;
		font-size: 15px;
		margin-top: 50px;
		margin:0 18px;
	}
	section input{
		display: inline-block;
		width: 98%;
		height: 30px;
		line-height: 30px;
		border:none;
		border-bottom: 1px solid rgb(231,231,231)
		
	}
	
	.login_btn{
		width: 88%;
		color: white;
		background-color: rgb(35,38,43);
		padding: 15px 0;
		
	}
	.social img{
		width:35%;
	}
	.clearfix{
		margin-top: 10px;
		width: 98%;
		margin-bottom: 20px;

	}
	.fr{
		color:rgb(241,149,14); 
	}
	input{
		outline: none;
		width: 100%;
		border:none;

	}
	.social{
		text-align: center;
	}
	.social table{
		width: 100%;
	}
	.social table tr{
		height: 50px;
	}
	p{
		color:rgb(144,144,144);
	}
	.or{
		margin-top: 70px;
		text-align: center;
	}
	.code{
		display: inline-block;
		width: 100%;
		background-color: rgb(117,117,117);
		padding: 5px 20px;
		line-height: 0;
		color: white;
		font-size: 15px;
	}
	.check_code{
		line-height: 0;
	}
	.login_icon{
		border:1px solid rgb(93,93,93);
		width: 60px;
		height: 30px;
		border-radius: 15px;
	}
</style>