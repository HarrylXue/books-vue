<template>
	<div id="userCenter" :style="{backgroundImage:'url('+userInfo.bgpic+')'}">
		<mt-header title="个人中心">
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
	  		<router-link to="/" slot="right">
	    		<mt-button icon="settings" class="settings"></mt-button>
	  		</router-link>
		</mt-header>
		<div class="info_box clearfix">
			<div class="fl">
				<img :src="userInfo.avatar" class="avatar" alt="" @click="$router.push('/login')">
			</div>
			<div class="fl">
				<div class="user_name">{{userInfo.userName}}</div>
				<div>
					<span>关注 {{userInfo.follow}}</span>
					<span>粉丝 {{userInfo.fans}}</span>
				</div>
			</div>
		</div>
		<div class="menu_list">
			<ul class="menu_list clearfix">
				<li class="fl">
					<router-link to="/money">
						<div>
							<img src="../assets/subMoney.png" alt="">
						</div>
						<div>我的余额</div>
					</router-link>
				</li>
				<li class="fl">
					<router-link to="/points">
						<div>
							<img src="../assets/score.png" alt="">
						</div>
						<div>我的积分</div>
					</router-link>
				</li>
				<li class="fl">
					<router-link to="/collect">
						<div>
						<img src="../assets/my_favorite.png" alt="">
					</div>
					<div>我的收藏</div>
					</router-link>	
				</li>
				<li class="fl">
					<router-link to="/message">
						<div>
							<img src="../assets/my_msg.png" alt="">
						</div>
						<div>我的消息</div>
					</router-link>	
				</li>
			</ul>
		</div>
		
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">图片</mt-tab-item>
		  <mt-tab-item id="2">视频</mt-tab-item>
		  <mt-tab-item id="3">文章</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <div class="clearfix" v-for="i of Math.ceil(imageList.length/2)">
		    	<div class="fl w_50 r_10" :style="{height:divHeight+'px',width:divHeight+'px',backgroundImage:'url('+imageList[2*(i-1)].img+')'}">
		    		<span v-if="imageList[2*(i-1)].imgeList.length>0">组图{{imageList[2*(i-1)].imgeList.length}}张</span>
		    		<div class="p_b" v-if="imageList[2*(i-1)].needMoney">收费{{imageList[2*(i-1)].price}}元</div>
		    	</div>
		    	<div v-if="imageList[2*i-1].id != -1" class="fl w_50 l_10" :style="{height:divHeight+'px',width:divHeight+'px',backgroundImage:'url('+imageList[2*i-1].img+')'}">
		    		<span v-if="imageList[2*i-1].imgeList.length>0">组图{{imageList[2*i-1].imgeList.length}}张</span>
		    		<div class="p_b" v-if="imageList[2*i-1].needMoney">收费{{imageList[2*i-1].price}}元</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="clearfix" v-for="i of Math.ceil(imageList.length/2)">
		  		<div class="fl w_50 r_10" :style="{height:divHeight+'px',width:divHeight+'px',backgroundImage:'url('+imageList[2*(i-1)].img+')'}">
		  			<div class="collects" v-if="imageList[2*(i-1)].needcollect">{{imageList[2*(i-1)].collect}}收藏</div>
		  			<div class="follower">{{imageList[2*(i-1)].time}}</div>
		  		</div>
		  		<div v-if="imageList[2*i-1].id != -1" class="fl w_50 l_10" :style="{height:divHeight+'px',width:divHeight+'px',backgroundImage:'url('+imageList[2*i-1].img+')'}">
		  			<div class="collects" v-if="imageList[2*i-1].needcollect">{{imageList[2*i-1].collect}}收藏</div>
		  			<div class="follower">{{imageList[2*i-1].time}}</div>
		  		</div>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <ul class="list_box">
				<li v-for="img in dataList" class="clearfix" @click="gotoDetail(img.id)">
					<div class="fl img_box">
						<img v-lazy="img.img" alt="">
					</div>
					<div class="fl intro_box">
						<div class="title_label">
							{{img.title}}
						</div>
						<div class="author_label">{{img.author}}</div>
						
						<div class="info_label">
							#{{img.type}}
							<div class="fr">
								<span class="comment">{{img.comment}}</span>
								<span class="favorite">{{img.favorite}}</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	export default{
		name:"userCenter",
		data(){
			return{
				selected:"1",
				imageList:[],
				divHeight:0,
				dataList:[],
			}
		},
		computed:{
			// 获取个人信息
			userInfo(){
				return this.$store.getters.getUserInfo;
			}
		},
		methods:{
			getData(){
				this.$http.get('./static/userImgData.json')
				.then(response=>{
					this.imageList = response.data.imgList;
					if (this.imageList.length%2!=0) {
						var obj={
							"id":"-1",
							"img":"static/homeImgs/hot_51.png",
							"title":"经典逆光人像速成技巧",
							"author":"李晓华",
							"description":"昨天借多久哦文件低价位机欧锦都二维",
							"type":"人像",
							"comment":10,
							"favorite":10,
							"needMoney":1,
							"price":0,
							"time":"05:30",
							"needcollect":1,
							"collect":23,
							"imgeList":[]
						}
						this.imageList.push(obj)
					}
				})
			},
			getSliderData(){
				this.$http.get('./static/sliderImgData.json')
				.then(response=>{
					console.log(response)
					this.imgList = response.data.list;
				})
			},
			gotoDetail(infoId){
				this.$store.dispatch('setInfoId',infoId);
				this.$router.push({path:'/imageDetail/img'})
			},
			getHomeList(){
				this.$http.get("./static/homeData.json")
				.then(response=>{
					console.log(response);
					this.dataList = response.data.dataList;
					this.hotList = response.data.hotList;
					if (this.hotList.length%2!=0) {
						var obj = {
							"id":"",
							"img":"",
							"title":"",
							"author":"",
							"description":"",
							"type":"",
							"comment":0,
							"favorite":0,
							"imgeList":[]
						}
						this.hotList.push(obj)
					}
				})
			}
		},
		mounted(){
			var width = document.querySelector('.mint-tab-container-wrap').clientWidth-60;
			this.divHeight = width/2;
			console.log(this.divHeight)
		},
		created(){
			this.getData();
			this.getSliderData();
			this.getHomeList();
		}
	}
</script>
<style scoped>
	#userCenter{
		background-repeat: no-repeat;
		background-size: contain;
		/*padding:0 15px;*/
		/*background-color:#f5f5f5;*/
	}
	#userCenter .mint-header{
		background-color: transparent;
	}
	.settings{
		width: 30px;
		height: 30px;
		background: url(../assets/settings.png) no-repeat center;
	}
	.info_box{
		margin: 50px 0 50px;
		padding: 0 20px;
	}
	.avatar{
		width: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.user_name,.user_name+div{
		color: white;
	}
	.user_name{
		font-size: 18px;
		height: 25px;
		line-height: 25px;
	}
	.user_name+div{
		font-size: 14px;
		height: 25px;
		line-height: 25px;
	}
	div.menu_list{
		padding:0 20px;
	}
	ul.menu_list{
		padding: 20px 0;
		border-bottom: 1px solid #dddddd;
	}
	ul.menu_list li{
		width: 25%;
		padding-top: 20px;
	}
	ul.menu_list li div{
		text-align: center;
		font-size: 13px;
	}
	ul.menu_list li div img{
		width: 50px;
	}
	.mint-tab-item{
		color: #2d2d2d;
		font-size: 13px;
	}
	.mint-navbar .mint-tab-item.is-selected{
		color: rgb(242,150,0);
		border-bottom: none; 
		margin-bottom: 0;
		position: relative;
	}
	.is-selected:after{
		width: 60%;
		height: 2px;
		position: absolute;
		left: 20%;
		bottom: 0;
		content: '';
		background:rgb(242,150,0);
	}
	.mint-tab-container-item>div{
		margin-bottom: 20px;
	}
	.w_50{

		/*border: 1px solid red;*/
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: relative;
	}
	.w_50 span{
		position: absolute;
		right: 0;
		top: 5px;
		padding: 5px 5px;
		color: white;
		background-color: rgba(242,150,0,0.4);
		font-size: 10px;
	}
	.r_10{
		margin-right: 10px;
	}
	.l_10{
		margin-left: 10px;
	}
	.p_b{
		width: 100%;
		text-align: right;
		position: absolute;
		left: 0;
		bottom: 0;
		color:white;
		font-size: 11px;
		padding: 0 10px 5px 0;
	}
	.follower{
		width: 100%;
		text-align: right;
		position: absolute;
		left: 0;
		bottom: 0;
		color:white;
		font-size: 11px;
		padding: 0 10px 5px 0;
	}
	.collects{
		width: 100%;
		text-align: left;
		position: absolute;
		left: 0;
		bottom: 0;
		color:white;
		font-size: 11px;
		padding: 0 10px 5px 0;
	}

	.list_box,.hot_box{
		width: 100%;
		background: rgb(250,250,250);
		margin-bottom: 0
		/*background: gray;*/
	}
	.list_box>li{
		width: 95%;
		margin: auto;
		margin-top: 10px;
		background: white;
		border:1px solid #f4f4f4;
		position: relative;
	}
	
	.img_box{
		width: 40%;
		position: relative;
		background-color: #bfbfbf;
	}
	.img_box>img{
		width: 100%;
		display: block;
	}
	/*.img_box:after{
		position: absolute;
		right: -4px;
		top: 5%;
		height: 90%;
		width: 4px;
		content: "";
		background: rgb(242,150,0);
	}*/
	.intro_box{
		width: 60%;
		padding: 0 15px;
		position: absolute;
    	top: 0px;
    	bottom: 0px;
    	right: 0;	
	}
	li>div.intro_box{
		color: rgb(154,154,154);
		text-align: left;
	}
	li>div.intro_box>div.title_label{
		color: rgb(45,45,45);
		font-size: 13px;
		margin-top: 10px;
	}
	li>div.intro_box>div.author_label{
		font-size: 11px;
		margin-top: 5px;
	}
	li>div.intro_box>div.des_label{
		font-size: 12px;
		margin-top: 10px;
	}
	li>div.intro_box>div.info_label{
		font-size: 11px;
		position: absolute;
		bottom: 5px;
		left: 15px;
		right: 15px;
		/*width:100%;*/
	}
	.comment{
		padding-left: 20px;
		background: url(../assets/comment.png) no-repeat left center; 
		background-size: 20px 20px;
	}
	.favorite{
		padding-left: 20px;
		background: url(../assets/favorite.png) no-repeat left center;
		background-size: 20px 20px;
	}
</style>
<style>
	.mint-tab-container-wrap{
		background: #f5f5f5;
		padding: 20px;
	}
</style>