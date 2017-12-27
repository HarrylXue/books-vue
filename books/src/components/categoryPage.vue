<!--  
父组件传值给子组件，可以使用props
-->
<template>
	<div id="category">
		<mt-header :title="navTitle">
	  		<mt-button icon="back" slot="left" @click="goBack">&nbsp;&nbsp;</mt-button>
	  		<router-link to="/" slot="right">
	    		<mt-button icon="search" class="search"></mt-button>
	  		</router-link>
		</mt-header>
		<slider type="category"></slider>
		<div class="profit" v-if="pageType == 'needMoney'">
			<div class="top_box clearfix">
				<div class="fl">
					收益榜
				</div>
				<router-link to="/profitDetail">
					<div class="fr">榜单详情</div>
				</router-link>
				
			</div>
			<ul class="clearfix list_box">
				<li class="fl" v-for="item in profitList">
					<div>
						<div class="user_bg">
							<img :src="item.bgpic" alt="" width="100%">
						</div>
						<div class="user_avatar">
							<img :src="item.avatar" alt="">
							<div class="order_num">{{item.order}}</div>
						</div>
						<div>{{item.userName}}</div>
						<div>收益:{{item.money}}元</div>
					</div>		
				</li>
			</ul>
		</div>
		<div style="height:38px;overflow-y:hidden">
			<div class="fl menu_box">
				<ul class="clearfix segment" :style="{width:70*typeList.length+'px'}">
					<li class="fl segment_item" v-for="(item,index) in typeList" :class="{active:selected==index}" @click="selected=index">{{item}}</li>
				</ul>
			</div>
			<div class="fl right_arrow" @click="jump()"></div>
		</div>
		<section>
			<ul class="data_box">
				<li v-for="item in dataList" @click="gotoDetail(item.id)">
					<div>
						<img v-lazy="item.img" alt="" width="100%">
					</div>
					<div class="clearfix first_line">
						<div class="fl">
							<span>{{item.title}}</span><span>#{{item.type}}</span>
						</div>
						<div class="fr">
							<img :src="item.avatar" alt="" >
							<span >{{item.author}}</span>
						</div>
					</div>
					<span>{{item.time}}</span>
					<div class="under_line clearfix">
						<div class="fl">
							<span>{{item.comment}}</span>
							<span>{{item.favorite}}</span>
							<span>{{item.reward}}</span>
						</div>
						<div class="fr"><span>分享</span></div>
					</div>
				</li>
			</ul>
		</section>
	</div>	
</template>
<script>
	// 注册子组件
	import slider from './sliderComponent.vue'
	export default{
		name:"category",
		data(){
			return{
				typeList:[
					"最新",
					"风景",
					"美女",
					"动物",
					"壁纸",
					"帅哥",
					"明星",
				],
				selected:0,
				dataList:[],
				size:0,
				pageType:'',//页面的类型：分类图片或收费图片
				navTitle:'',//导航条标题
				profitList:[]
			}
		},
		components:{slider},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			getData(){
				// 如果是收费图片，需要获取榜单前三名
				if (this.pageType == 'needMoney') {
					console.log("-=-=-=-=")
					this.$http.get('./static/profitList.json')
					.then(response=>{
						this.profitList = response.data.dataList.topThree;
						console.log(this.profitList)
					})
				}
				this.$http.get('./static/category.json?imgType=1')
				.then(response=>{
					// console.log(response)
					this.dataList = response.data.dataList;
				})
			},
			jump(){
				var div = document.querySelector('.menu_box');
				this.size += 70;
				div.scrollTo(this.size,0)
			},
			gotoDetail(infoId){
				this.$store.dispatch('setInfoId',infoId);
				this.$router.push({path:'/imageDetail/img'})
			}
		},
		created(){
			
			console.log("-=-=-=-=",this.$route.params)//获取接收到的参数
			this.pageType = this.$route.params.type;
			this.getData();
			if (this.pageType == 'category') {
				this.navTitle = "分类图片"
			}else{
				this.navTitle = "收费图片"
			}

		}
	}
</script>
<style scoped>
	/*.segment{
		width:90%;
		overflow-x: auto;
	}*/
	.menu_box{
		width: 90%;
		height: 55px;
		overflow-x: auto;
		margin: 0;
	}
	.segment_item{
		width: 70px;
		text-align: center;
		font-size: 13px;
		color: #2d2d2d;
		padding: 10px 0;
		position: relative;
	}
	.active:after{
		width: 80%;
		height: 1px;
		position: absolute;
		left: 10%;
		bottom: 0;
		content: '';
		background:rgb(242,150,0);
	}
	.right_arrow{
		width: 10%;
		margin: 0;
		height: 37px;
		background: url(../assets/arrow_right.png) no-repeat center;
		background-size: 20px;
	}
	.data_box{
		margin-top: 15px;
		background-color: rgb(242,242,242);
	}
	.data_box li{
		margin-bottom: 10px;
		background: white;
	}
	.first_line{
		margin: 5px 0;
		padding: 5px 10px;
	}
	.first_line div:first-child{
		width: 60%;
	}
	.first_line div:last-child{
		width: 40%;
		text-align: right;
	}
	.first_line div:first-child span:first-child{
		font-size: 17px;
		color: #2d2d2d;
	}
	.first_line div:first-child span:last-child{
		font-size: 10px;
		color: #919191;
		margin-left: 10px;
	}
	.first_line div:last-child img{
		width: 24px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.first_line div:last-child span{
		vertical-align: middle;
		color: #919191;
		font-size: 11px;
	}
	.first_line+span{
		padding-left: 10px;
		color: #919191;
		font-size: 11px;
	}
	.under_line{
		width: 96%;
		margin:10px auto;
		border-top: 1px solid rgb(221,221,221);
		padding: 10px 0;
		font-size: 11px;
		color: #919191;
	}
	.under_line div:first-child span{
		margin-right: 10px;
	}
	.under_line div:first-child span:first-child{
		padding-left: 18px;
		background: url(../assets/comment.png) no-repeat left center;
		background-size: 18px;
	}
	.under_line div:first-child span:nth-child(2){
		padding-left: 18px;
		background: url(../assets/favorite.png) no-repeat left center;
		background-size: 18px;
	}
	.under_line div:first-child span:last-child{
		padding-left: 18px;
		background: url(../assets/praise_small.png) no-repeat left center;
		background-size: 15px;
	}
	.under_line div:last-child span{
		padding-left: 18px;
		padding-right: 5px;
		background: url(../assets/share_small.png) no-repeat left center;
		background-size: 15px;
	}
	.profit{
		width: 100%;
		border-bottom: 10px solid rgb(242,242,242);
		padding: 10px 5px 5px;
		font-size: 13px;
	}
	.profit>.top_box>div:first-child{
		margin-left: 5px;
		padding-left: 20px;
		background: url(../assets/wallet.png) no-repeat left center;
		background-size: 18px 18px;
	}
	.profit>.top_box>a>div{
		height: 20px;
		line-height: 20px;
		border-radius: 10px;
		padding: 0 7px;
		border: 1px solid rgb(202,202,202);
		color:rgb(145,145,145);
		font-size: 12px;
	}
	.profit ul{
		padding: 0 5px;
	}
	.profit ul li{
		margin: 10px 0px;
		width: 33.33%;
		min-height: 80px;
		/*border: 1px solid red;*/
	}
	.profit ul li>div{
		margin: 5px 3px;
		min-height: 60px;
		/*border: 1px solid red;*/
		box-shadow: 0 0 2px #dcdcdc;
		position: relative;
	}
	.profit ul li>div:before{
		position: absolute;
		content: '';
		width: 90%;
		height: 2px;
		left: 5%;
		top:-2px;
		background: rgb(242,150,0);
		box-shadow: 0 0 2px #dcdcdc;
	}
	.profit ul li>div:after{
		position: absolute;
		content: '';
		width: 90%;
		height: 2px;
		left: 5%;
		bottom:-2px;
		background: rgb(242,150,0);
		box-shadow: 0 0 2px #dcdcdc;
	}
	/*.profit ul li:first-child>div{
		margin-right: 2px;
	}
	.profit ul li:nth-child(2)>div{
		margin: 5px 2px;
	}
	.profit ul li:last-child>div{
		margin-left: 2px;
	}*/
	.user_avatar{
		text-align: center;
		position: relative;
		margin-top: -34px;
	}
	.user_avatar>img{
		width: 40px;
		border-radius: 50%;
	}
	.user_avatar>div{
		text-align: center;
		width: 15px;
		height: 15px;
		line-height: 15px;
		border-radius: 10px;
		background-color: #e60012;
		color: white;
		font-size: 8px;
		position: absolute;
		top: 25px;
		left: 55%;
	}
	.user_avatar+div{
		color: #919191;
		font-size: 13px;
		text-align: center;
		padding: 5px 0;
	}
	.user_avatar+div+div{
		text-align: center;
		font-size: 12px;
		padding: 5px;
		padding-bottom: 15px;
	}
	ul li:nth-child(2) .user_avatar>div{
		background: #ffac2a;
	}
	ul li:last-child .user_avatar>div{
		background: #6dc02a
	}
</style>