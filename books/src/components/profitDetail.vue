<template>
	<div id="profitDetail">
		<mt-header title="榜单详情">
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
	  		
	    	<mt-button icon="more" slot="right"></mt-button>

		</mt-header>
		<section>
			<ul>
				<li class="clearfix" v-for="item in profitList">
					<div class="fl">
						<div class="order">{{item.order}}</div>
					</div>
					<div class="fl avatar">
						<img :src="item.avatar" alt="">
					</div>
					<div class="fl user_info">
						<div class="userName">{{item.userName}}</div>
						<div class="income">收益：{{item.money}}元</div>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
	export default{
		name:'profitDetail',
		data(){
			return{
				profitList:[]
			}
		},
		created(){
			this.$http.get('./static/profitList.json')
			.then(response=>{
				this.profitList = response.data.dataList.allData;
				console.log(this.profitList)
			})
		}
	}
</script>
<style scoped>
	ul li{
		padding: 15px 0px;
		width: 90%;
		margin: auto;
		border-bottom: 1px dashed #dddddd;
		height: 90px;
	}
	ul li>div:first-child{
		width: 35px;
	}
	.order{
		background: #dcdcdc;
		width: 24px;
		height: 24px;
		margin: auto;
		margin-top: 21px;
		text-align: center;
		line-height: 24px;
		color: white;
		font-size: 10px;
		border-radius: 50%;
		/*margin-right: 5px;*/
	}
	ul li:first-child>div .order,ul li:nth-child(2)>div .order,ul li:nth-child(3)>div .order{
		background: url(../assets/first.png) no-repeat center;
		background-size: 30px;
		width: 30px;
		height: 30px;
		margin-top: 15px;
		line-height: 30px;
		padding-top:5px;
	}
	ul li:nth-child(2)>div .order{
		background-image: url(../assets/second.png);
	}
	ul li:nth-child(3)>div .order{
		background-image: url(../assets/third.png);
	}
	.avatar>img{
		width: 50px;
		border-radius: 50%;
		margin-top: 5px;
	}
	.user_info{
		margin-left: 20px;
		margin-top: 10px;
	}
	.user_info>.userName{
		color: #2d2d2d;
		font-size: 13px;
		margin-bottom: 5px;
	}
	.user_info>.income{
		color: #919191;
		font-size: 12px;
	}
</style>