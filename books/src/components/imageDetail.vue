<template>
	<div id="imageDetail" :style="{height:viewHeight+'px'}" :class="{noScroll:showMoneyView}">
		<header class="top_header">
			<mt-header>
	    		<mt-button icon="back" slot="left" @click="goBack">&nbsp;&nbsp;</mt-button>
	  			<mt-button slot="right">+关注</mt-button>
			</mt-header>
			<div class="user_box">
				<img class="avatar" v-lazy="imgDetailInfo.avatar" alt="">
				{{imgDetailInfo.author}}
			</div>
			
		</header>
		<section>
			<div v-if="type=='news'" class="news_view">
				<div class="news_title">{{imgDetailInfo.title}}</div>
				<div class="time">{{imgDetailInfo.time}}</div>
				<div class="nav_content">
					导读：{{imgDetailInfo.navContent}}
				</div>
				<div class="content" v-html="imgDetailInfo.content">
					
				</div>
			</div>
			<div v-if="type=='video'">
				<video :src="imgDetailInfo.video" controls="" width="100%"></video>
			</div>
			<div v-if="type=='img'" class="img_box" v-for="url in imgDetailInfo.imgeList">
				<img v-lazy="url" alt="">
			</div>
			<div v-if="type=='img'||type=='video'" class="data_box">
				<div class="title">
					{{imgDetailInfo.title}}
					<span>#{{imgDetailInfo.type}}</span>
				</div>
				<div class="des">
					{{imgDetailInfo.description}}
				</div>
				<div class="time">{{imgDetailInfo.time}}</div>
			</div>
			<div class="money_box" >
				<div class="tips">点赞是美德，打赏是鼓励</div>
				<div class="btn_box">
					<mt-button type="primary" @click="showMoneyView=true"><span>$</span>打赏</mt-button>
				</div>
				<div class="reward_box">
					<span class="reward_tips" v-if="rewardList.length==0">还没有人打赏，来当第一个打赏的人吧！</span>
					<ul v-if="rewardList.length!=0" class="clearfix">
						<li class="fl" v-for="user in imgDetailInfo.moneyList">
							<div>
								<img v-lazy="user.avatar" alt="">
							</div>
							<div>
								<span>$</span>{{user.money}}元
							</div>
						</li> 
					</ul>
				</div>
			</div>
			<div class="comment_box">
				<span>评论（{{comments.length}}）</span>
				<ul>
					<li v-for="info in comments" class="clearfix">
						<div class="fl avatar_box">
							<img v-lazy="info.avatar" alt="">
						</div>
						<div class="fl content_box">
							<div class="user_name">{{info.author}} <span>{{info.time}}</span></div>
							<div class="content_label">{{info.content}}</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<footer>
			<input type="text" class="input_control" placeholder="说点什么吧" @keyup.enter="comitComment" v-model="inputText">
			<button type="button" class="praise" :class="{'praise_active':praiseIsActive}" @click="praiseIsActive = !praiseIsActive"></button>
			<button type="button" class="favorite" :class="{'favorite_active':isFav}" @click="isFav = !isFav"></button>
			<button type="button" class="share"></button>
		</footer>

		<div class="moneyView" v-if="showMoneyView">
			<div class="content_view">
				<div class="clearfix">
					<span class="fr close_btn" @click="showMoneyView=false">×</span>
				</div>
				<div>
					<img v-lazy="imgDetailInfo.avatar" alt="" class="avatar_lg">
					<div style="text-align:center;color:#919191;font-size:12px; margin-top:5px;">向{{imgDetailInfo.author}}打赏</div>
				</div>
				<div class="count_box">
					<span @click="money=money>1?--money:1">-</span>
					<input type="text" v-model="money">
					<span @click="money++">+</span>
				</div>
				<div>
					留言：
					<textarea name="" id="" cols="30" rows="4"></textarea>
				</div>
				<div class="btn_box">
					<mt-button type="primary" class="btn_round" @click="giveMoney">赏了</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>					
	import qs from 'qs'
	import { MessageBox } from 'mint-ui';//单独引入弹出框
	// 格式化日期代码
	Date.prototype.format = function(fmt)
	{ //author: meizz
	  var o = {
	    "M+" : this.getMonth()+1,                 //月份
	    "d+" : this.getDate(),                    //日
	    "h+" : this.getHours(),                   //小时
	    "m+" : this.getMinutes(),                 //分
	    "s+" : this.getSeconds(),                 //秒
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度
	    "S"  : this.getMilliseconds()             //毫秒
	  };
	  if(/(y+)/.test(fmt))
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	  for(var k in o)
	    if(new RegExp("("+ k +")").test(fmt))
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	  return fmt;
	}
	export default{
		name:"imageDetail",
		data(){
			return{
				imgDetailInfo:{},
				rewardList:[],//打赏数组
				comments:[],//评论数组
				praiseIsActive:0,
				isFav:0,
				viewHeight:0,
				showMoneyView:false,  //用来判断是否显示打赏页面
				money:1,  //打赏的钱数
				inputText:'',//评论文本框中输入的内容
				type:'' //表示当前页面的类型
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
				console.log("-=-=-=")
			},
			getImgDetail(){
				this.$http.get('./static/imgDetail.json?id='+this.infoId)
				.then(response=>{
					console.log(response);
					this.imgDetailInfo = response.data.data;	
					this.rewardList = this.imgDetailInfo.moneyList;
					this.comments = response.data.data.commentList;	
					this.praiseIsActive = response.data.data.isPraise;
					this.isFav = response.data.data.isFav;
				})
			},
			giveMoney(){
				console.log(this.loginStatus)
				if (this.loginStatus) {
					var isInArr = false
					// 遍历已有的打赏数组
					for (var i = 0; i < this.rewardList.length; i++) {
						if (this.rewardList[i].id == this.userId) {
							this.rewardList[i].money+=this.money;
							isInArr = true;
							break;
						}
					}
					// 数组中没有打赏记录
					if (!isInArr) {
						var obj = {
							"id":this.userInfo.userId,
							"name":this.userInfo.userName,
							"avatar":this.userInfo.avatar,
							"money":this.money
						}

						this.rewardList.push(obj);
					}
				}else{
					MessageBox({
					  title: '提示',
					  message: '您还没有登录',
					  showCancelButton: true,
					  showConfirmButton:true
					})
					.then(action=>{
						console.log(action)
						if (action=='confirm') {
							console.log('去登陆页面')
						}
					})

				}
				this.showMoneyView=false;
			},
			// 添加评论
			comitComment(){
				if (this.inputText.length == 0) {
					MessageBox('请输入评论内容')
				}else{
					var time = new Date().format('MM-dd hh:mm');
					console.log(time)
					var obj = {
						"author":this.userInfo.userName,
						"avatar":this.userInfo.avatar,
						"content":this.inputText,
						"time":time
					}
					// 将新数据加入到评论数组
					this.comments.push(obj);
					this.inputText='';
				}
			}
		},
		computed:{
			infoId:function(){
				return this.$store.getters.getInfoId;
			},
			loginStatus:function(){
				return this.$store.getters.getLoginStatus;
			},
			userInfo:function(){
				return this.$store.getters.getUserInfo;
			},
			newsInfo:function(){
				// console.log(this.$store.getters.getNewsInfo)
				return this.$store.getters.getNewsInfo;
			},
			videoInfo:function(){
				// console.log(this.$store.getters.getNewsInfo)
				return this.$store.getters.getVideoInfo;
			}
		},
		mounted(){
			if (this.type == 'news') {
				// 设置图片比例
				document.querySelector('.news_view .content img').style.width='100%';
			}
			
		},
		created(){
			this.viewHeight = screen.height;	
			this.type = this.$route.params.type;
			if (this.type == 'news') {
				this.imgDetailInfo = this.newsInfo;	
				this.rewardList = this.imgDetailInfo.moneyList;
				this.comments = this.imgDetailInfo.commentList;	
				this.praiseIsActive = this.imgDetailInfo.isPraise;
				this.isFav = this.imgDetailInfo.isFav;
				console.log(this.imgDetailInfo)
			}else if(this.type == 'video'){
				console.log(this.videoInfo)
				this.imgDetailInfo = this.videoInfo;	
				this.rewardList = this.imgDetailInfo.moneyList;
				this.comments = this.imgDetailInfo.commentList;	
				this.praiseIsActive = this.imgDetailInfo.isPraise;
				this.isFav = this.imgDetailInfo.isFav;
				console.log(this.imgDetailInfo)
			}else{
				this.getImgDetail();
			}			
		}
	}
</script>
<style scoped>
	.mint-header{
		background: rgb(35,38,43);
		height: 44px;
	}
	.top_header{
		position: relative;
	}
	.user_box{
		color: white;
		font-size: 15px;
		position: absolute;
		left: 15%;
		top: 0px;
		width: 70%;
		height: 44px;
		line-height: 44px;
		text-align: center;
	}
	.avatar{
		width: 30px;
		height: 30px;
		border-radius:50%;
		vertical-align: middle;
		margin-right: 5px;
	}
	.img_box{
		width: 100%;
		margin-bottom: 5px;
	}
	.img_box img{
		width: 100%;
		display: block;
	}
	.data_box{
		padding: 5px 10px;
	}
	.data_box>.title{
		font-size: 15px;
		color: #2d2d2d;
		margin-top: 10px;
	}
	.data_box>.title>span{
		font-size: 11px;
		color: #919191;
		margin-left: 10px;
	}
	.data_box>.des{
		color: #2d2d2d;
		font-size: 12px;
		margin: 10px 0 0;
		line-height: 23px
	}
	.time{
		color: #919191;
		font-size: 10px;
		padding:10px 20px;
		background: url(../assets/clock.png) no-repeat left center;
		background-size: 18px 18px;
	}
	.money_box{
		border-top: 1px solid #dcdcdc;
		border-bottom: 1px solid #dcdcdc;
		padding: 15px 5px;
		text-align: center;
	}
	.tips{
		color:#2d2d2d;
		font-size: 12px;
	}
	.btn_box{
		padding: 20px;
		text-align: center;
		line-height: 15px;
	}
	.btn_box>.mint-button--primary,.primary{
		background: rgb(242,150,0);
		border-radius: 0;
		border:none;
		outline: none;
		width: 150px;
		font-size: 12px;
	}
	.btn_box>.mint-button--primary span{
		display: inline-block;
		/*padding: 5px;*/
		border-radius: 50%;
		background: white;
		color: rgb(242,150,0);
		width: 15px;
		height: 15px;
		margin-right: 5px;
	}
	.reward_tips{
		font-size: 10px;
		color: #919191;
	}
	.reward_box ul{
		width: 100%;
		overflow-x: auto;
	}
	.reward_box ul li{
		width: 100px;
	}
	.reward_box ul li div{
		width: 50%;
		margin: auto;
		text-align: center;
		color: rgb(242,150,0);
		font-size: 12px;
	}
	.reward_box ul li div img{
		width: 90%;
		border-radius: 50%;
	}
	.reward_box ul li div span{
		color: white;
		display: inline-block;
		/*padding: 5px;*/
		border-radius: 50%;
		background: rgb(242,150,0);
		width: 15px;
		height: 15px;
		margin-right: 5px;
	}
	.comment_box{
		padding: 10px;
	}
	.comment_box ul li{
		padding: 10px;
		border-bottom: 1px dotted #dcdcdc;
		position: relative;
	}
	.avatar_box{
		width: 25%;
		height: 100%;
	}
	.avatar_box img{
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.content_box{
		height: 60px;
		width: 70%;
	}
	.content_box div{
		height: 30px;
		color: #2d2d2d;
	}
	.user_name{
		font-size: 12px;
	}
	.user_name span{
		color: #919191;
		margin-left: 10px;
		font-size: 12px;
	}
	.content_label{
		font-size: 13px;
	}
	footer{
		position: fixed;
		bottom: 0;
		left: 0;
		/*background: orange;*/
		height: 50px;
		width: 100%;
		background: white;
		line-height: 50px;
		border-top: 1px solid #dcdcdc;
	}
	.input_control{
		outline: none;
		border:none;
		background: rgb(242,242,242);
		height: 30px;
		/*margin-top: 10px;*/
		margin-left: 10px;
		border-radius: 15px;
		width: 60%;
		padding-left: 10px;
		vertical-align: middle;
	}
	button{
		width: 30px;
		height: 30px;
		display: inline-block;
		vertical-align: middle;
		border: none;
		outline: none;
		background-color: transparent;
	}
	.praise{
		background: url(../assets/praise.png) no-repeat center;
		background-size: 70%;
	}
	.praise_active{
		background-image: url(../assets/praised.png);
	}
	.favorite{
		background: url(../assets/favorite_big.png) no-repeat center;
		background-size: 70%;
	}
	.favorite_active{
		background-image: url(../assets/favorited.png);
	}
	.share{
		background: url(../assets/share.png) no-repeat center;
		background-size: 70%;
	}
	.moneyView{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,.5);
	}
	#imageDetail{
		overflow:auto;
		padding-bottom: 55px;
	}
	#imageDetail.noScroll{
		overflow:hidden;
		padding-bottom:0;
	}
	.content_view{
		width: 80%;
		margin: 150px auto;
		height: 400px;
		background: white;
		border-radius: 2px;
	}
	.close_btn{
		padding: 5px;
		font-size: 25px;
		margin-right: 5px;
		color: rgb(142,142,142);
		cursor: pointer;
	}
	.avatar_lg{
		width: 50px;
		border-radius: 50%;
		display: block;
		margin: auto;
	}
	.count_box{
		width: 80%;
		padding: 15px;
		margin: auto;
		border-bottom: 1px solid rgb(240,240,240);
		font-size: 12px;
		text-align: center;
	}
	.count_box span{
		color: black;
		font-size: 20px;
	}
	.count_box input{
		width: 50px;
		border: none;
		outline: none;
		text-align: center;
		color: rgb(142,142,142);
	}
	.count_box+div{
		text-align: left;
		color: rgb(142,142,142);
		width: 80%;
		margin: auto;
		margin-top: 20px;
	}
	.count_box+div textarea{
		border: none;
		resize: none;
	}
	.btn_round{
		height: 40px;
		border-radius:20px!important; 
	}
	.news_view{
		padding: 20px 10px 10px;
	}
	.news_view .content img,.news_view .content{
		width: 100%;
	}
	.news_view .news_title{
		color: #2d2d2d;
		font-size: 18px;
	}
	.nav_content{
		color: #2d2d2d;
		font-size: 13px;
		margin: 10px 0;
	}
	.content{
		font-size: 13px;
	}
</style>
<style>
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.clearfix{
		overflow: hidden;
	}

</style>