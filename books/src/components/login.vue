<template>
	<div id="login">
		<mt-header title="登录">
	  		<mt-button icon="back" slot="left" @click="goBack">&nbsp;&nbsp;</mt-button>
		</mt-header>
		<section>
			<div class="logo">
				<img src="../assets/fox.png" alt="fox">
			</div>
			<label for="account">账号</label><br>
			<div class="login_info">
				<input type="text" name="account" v-model="account"><br>
			</div>
			
			<label for="password">密码</label><br>
			<div class="login_info">
				<input type="password" name="password" v-model="password">
			</div>
			
			<div class="clearfix">
				<router-link to='/getback'>
					<div class="fl">找回密码?</div>
				</router-link>
				<router-link to="/register">
					<div class="fr">快速注册&gt;</div>	
				</router-link>		
			</div>
			
		</section>
		<div class="btn">
			<input type="button" value="登录" class="login_btn" @click="Login()">
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
	import MessageBox from 'mint-ui'
	export default{
		name:"loign",
		data(){
			return{
				account:'',
				password:''
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			Login(){

				console.log(this.account,this.password)
				console.log(this.getUser,this.getPwd)
				if(this.getUser == this.account && this.getPwd == this.password){
					alert('Login Successfully')
					
						this.$router.push({path:'./userCenter'})
					
				}else{
					alert('Login failed,Try Again')

						this.$router.push({path:'./login'})
					
				}
			}
		},
		computed:{
			getUser(){
				return this.$store.getters.getUser;
			},
			getPwd(){
				return this.$store.getters.getPwd;
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
		text-align: center;
		margin-top: 30px;
		margin-bottom: 50px;
	}
	.logo img{
		width: 15%;
	}
	section{
		color: rgb(144,144,144);
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
	.btn,.login_info{
		text-align: center;
	}
	.login_btn{
		width: 88%;
		color: white;
		background-color: rgb(35,38,43);
		padding: 15px 0;
		margin-top: 20px;
	}
	.social img{
		width:35%;
	}
	.clearfix{
		line-height: 50px;
	}
	.fr{
		color:rgb(241,149,14); 
	}
	input{
		
		width: 100%;
		border:none;
		outline: none;
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
		text-align: center;
		margin-top:70px;
	}

</style>