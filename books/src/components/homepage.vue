<template>
	<div id="homepage">
		<mt-header title="白狐图片分享社区">
	    	<mt-button class="user_center" slot="left" @click="goToUserCenter"></mt-button>
	  
	  		<router-link to="/" slot="right">
	    		<mt-button class="search"></mt-button>
	  		</router-link>
		</mt-header>
		<div class="load_page">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
		<slider type="homepage"></slider>
		<section>
			<table class="menu_box">
				<tr>
					<td>
						<router-link to="/category/category">		
							<div class="menu_logo"></div>
							<div>
								分类图片
							</div>
						</router-link>
					</td>
					<td>
						<router-link to="/category/needMoney">
							<div class="menu_logo"></div>
							<div>付费图片</div>
						</router-link>
					</td>
					<td>
						<router-link to="/news">
							<div class="menu_logo"></div>
							<div>资讯杂谈</div>
						</router-link>
					</td>
				</tr>
				<tr>
					<td>
						<router-link to="/video">
							<div class="menu_logo"></div>
							<div>视频拍客</div>
						</router-link>
					</td>
					<td>
						<div class="menu_logo"></div>
						<div>积分商城</div>
					</td>
					<td>
						<router-link to="/follow">
							<div class="menu_logo"></div>
							<div>关注动态</div>
						</router-link>
					</td>
				</tr>
			</table>
		</section>
		<section>
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
						<div class="des_label">
							{{img.description}}
						</div>
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
		</section>
		<section class="hot_box">
			<h2>
				热
				<span class="l_border"></span>
				门
				<span class="l_border"></span>
				图
				<span class="l_border"></span>
				片
				<div>
					HOT PICTURES
				</div>
			</h2>
			<table class="hot_table">
				<tr v-for="i of Math.ceil(hotList.length/2)">
				<!-- {{hotList[2*(i-1)].author}} -->
				<!-- {{hotList[2*i-1].author}} -->
					<td v-for="j of 2" @click="gotoDetail(hotList[2*i+j-3].id)">
						<div>
							<img v-lazy="hotList[2*i+j-3].img" alt="">
							<span v-if="hotList[2*i+j-3].id.length>0">组图{{hotList[2*i+j-3].imgeList.length}}张</span>
						</div>
						<div class="hot_title" v-if="hotList[2*i+j-3].id.length>0">
							{{hotList[2*i+j-3].title}}
						</div>
						<div class="hot_author" v-if="hotList[2*i+j-3].id.length>0">
							{{hotList[2*i+j-3].author}}
						</div>
						<div class="hot_info" v-if="hotList[2*i+j-3].id.length>0">
							<b>{{hotList[2*i+j-3].comment}}</b>
							<b>{{hotList[2*i+j-3].favorite}}</b>
						</div>
					</td>
				</tr>
			</table>
		</section>
		</mt-loadmore>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';//单独引入弹出框
// 注册子组件
	import slider from './sliderComponent.vue'
	export default{
		name:"homepage",
		data(){
			return{
				imgList:[],
				height:0,
				dataList:[],
				hotList:[],
				allLoaded:false,  //是否已经加载完所有数据
				pageNo:1
			}
		},
		components:{slider},
		methods:{
			imgLoded(){
				// 图片加载完成后，获取图片的高度
				this.height = event.target.height;
				// console.log(event.target)
			},
			getSliderData(){
				this.$http.get('./static/sliderImgData.json')
				.then(response=>{
					console.log(response)
					this.imgList = response.data.list;
				})
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
			},
			loadTop(){
				this.pageNo = 1;
				// 下拉刷新方法，重新获取数据
				this.getSliderData();
				this.getHomeList();

				setTimeout(()=>{
					// 恢复刷新控件
					this.$refs.loadmore.onTopLoaded();
				},2000)
				
			},
			loadBottom(){
				this.pageNo++;
				// 加载更多，一般用于处理分页获取
				this.lodeMoreData()
			},
			lodeMoreData(){
				// 访问接口，将新数据添加到原有数组红
				setTimeout(()=>{
					// 恢复加载控件
					 this.$refs.loadmore.onBottomLoaded();
				},2000)
				// 判断是否有更多，如果没有则不再显示加载功能
				if (this.pageNo>4) {
					this.allLoaded = true;
				}
			},
			gotoDetail(infoId){
				this.$store.dispatch('setInfoId',infoId);
				this.$router.push({path:'/imageDetail/img'})
			},
			goToUserCenter(){
				//首先需要获取登录状态
				var status = this.$store.getters.getLoginStatus;
				console.log(status)
				// 如果有已经登录，则进入到个人中心
				if (status) {
					this.$router.push({path:'/userCenter'})
				}else{
					// 如果未登录，则跳转到登录页
					this.$router.push({path:'/login'})
				}	
			}
		},
		created(){
			this.getSliderData();
			this.getHomeList();
		}
	}
</script>
<style scoped>
	/*隐藏滚动条*/
	html {
	    -ms-overflow-style:none;
	    overflow:-moz-scrollbars-none;
	}
	html::-webkit-scrollbar{width:0px}
	a{
		color:rgb(45,45,45);
		text-decoration: none;
	}
	.load_page{

		overflow-y: scroll;
	}
	.mint-header{
		background: rgb(35,38,43);
		height: 44px;
	}
	.user_center{
		width: 30px;
		height: 30px;
		background: url(../assets/user_center.png);
		background-size: 100%;
		border-radius: 50%;
	}
	.search{
		width: 30px;
		height: 30px;
		background: url(../assets/search.png);
		background-size: 100%;
		border-radius: 50%;
	}
	.mint-swipe-item img{
		width: 100%;
	}
	table.menu_box{
		width: 100%;
		margin-bottom: 20px;
		text-align: center;
	}
	table.menu_box td{
		/*border:1px solid red;*/
		color:rgb(45,45,45);
		padding: 10px 0;
	}
	table.menu_box td div.menu_logo{
		margin: auto;
		width: 50px;
		height:45px;
		background: no-repeat center;
		background-size: 70%;
	}
	table.menu_box tr:first-child>td:first-child div.menu_logo{
		background-image: url(../assets/img_catagory.gif);
	}
	table.menu_box tr:first-child>td:nth-child(2) div.menu_logo{
		background-image: url(../assets/img_money.gif);
		background-size: 50%;
	}
	table.menu_box tr:first-child>td:nth-child(3) div.menu_logo{
		background-image: url(../assets/news.gif);
	}
	table.menu_box tr:last-child>td:nth-child(1) div.menu_logo{
		background-image: url(../assets/video.gif);
	}
	table.menu_box tr:last-child>td:nth-child(2) div.menu_logo{
		background-image: url(../assets/jifen.gif);
		background-size: 50%;
	}
	table.menu_box tr:last-child>td:nth-child(3) div.menu_logo{
		background-image: url(../assets/follow.gif);
		background-size: 50%;
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
	.img_box:after{
		position: absolute;
		right: -4px;
		top: 5%;
		height: 90%;
		width: 4px;
		content: "";
		background: rgb(242,150,0);
	}
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
	.hot_box h2{
		margin: 0;
		font-size: 15px;
		padding: 15px;
		color: #2d2d2d;
		text-align: center;
	}
	.l_border{
		display: inline-block;
		height: 10px;
		border-left: 1px solid #919191;
		margin-left: 3px;
		margin-right: 3px;
	}
	.hot_box h2 div{
		margin-top: 5px;
	}
	.hot_table{
		width: 100%;
		background: rgb(250,250,250);
		border-spacing: 10px;
	}
	.hot_table td{
		/*width: 50%;*/
		/*background: rgb(250,250,250);*/
		background: white;
		padding: 0;
		padding-bottom: 5px;
		border:1px solid #f4f4f4;
	}
	.hot_table td div{
		position: relative;
		width: 100%;
		text-align: left;
		color: #919191;
		background-color: white;
		margin: auto;
		padding: 0 5px;
	}
	.hot_table td div:first-child{
		padding: 0;

	}
	.hot_table td img{
		width: 100%;
		display: block;
	}
	.hot_table td div span{
		position: absolute;
		right: 0;
		top: 5px;
		padding: 5px 5px;
		color: white;
		background-color: rgba(242,150,0,0.4);
		font-size: 10px;
	}
	.hot_table td div.hot_title{
		margin-top: 10px;
		color: #000000;
		font-size: 13px;
	}
	.hot_table td div.hot_author{
		font-size: 11px;
		margin-top: 5px;
		padding: 5px 5px 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	.hot_table td div.hot_info{
		padding-top: 5px;
		padding-bottom:10px;
	}
	.hot_table td div.hot_info b{
		font-weight: normal;
		font-size: 10px;
		padding-left: 20px;
		background: no-repeat left center;
		background-size: 20px 20px;
		padding-right: 10px;
		
	}
	.hot_table td div.hot_info b:first-child{
		background-image: url('../assets/comment.png');
	}
	.hot_table td div.hot_info b:last-child{
		background-image: url('../assets/favorite.png');
	}
</style>
<style>
	*{
		box-sizing: border-box;	
	}
	/*隐藏滚动条*/
	html {
	    -ms-overflow-style:none;
	    overflow:-moz-scrollbars-none;
	}
	html::-webkit-scrollbar{width:0px}
	div.mint-swipe-indicator{
		background: white;
		opacity: 1;
	}
	.mint-swipe-indicator.is-active{
		background: orange;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.clearfix{
		overflow: hidden;
	}
	.mint-header{
		background: rgb(35,38,43);
		height: 44px;
	}
</style>