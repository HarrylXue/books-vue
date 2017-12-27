<template>
	<div id="getbackPwd">
		<mt-header title="找回密码">
	  		<mt-button icon="back" slot="left" @click="goBack">&nbsp;&nbsp;</mt-button>
		</mt-header>
		<section>
			<div class="getback">
				<input type="email" placeholder="请输入注册时邮箱账号">
			</div>

			<div class="code">
				<input type="text" placeholder="请输入验证码">
				<input type="button">
				<img src="" alt="">
			</div>
		</section>
		<div class="btn">
			<input type="button" value="下一步" class="next_btn">
		</div>
	</div>
</template>
<script>
	export default{
		name:"getbackPwd",
		data(){
			return{

			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.mint-header{
		background-color: rgb(35,38,43);
		color:white;
	}
	section{
		color: rgb(144,144,144);
		margin-top: 50px;
		font-size: 15px;
		/*margin-top: 800px;*/
		/*margin:0 18px;*/
	}
	section input{
		display: inline-block;
		width: 76%;
		height: 35px;
		line-height: 35px;
		border:1px solid rgb(231,231,231);
		
	}
	input{
		outline: none;
	}
	.code,.getback,.btn{
		text-align: center;
		margin-top: 20px;
	}
	.next_btn{
		width: 80%;
		color: white;
		background-color: rgb(35,38,43);
		padding: 15px 0;
		margin-top: 20px;
		border: none;
	}
</style>