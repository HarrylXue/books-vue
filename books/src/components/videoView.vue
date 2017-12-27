<template>
	<div id="video">
		<mt-header title="视频拍客">
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
	  		<router-link to="/" slot="right">
	    		<mt-button icon="search" class="search"></mt-button>
	  		</router-link>
		</mt-header>
		<slider type="video"></slider>
		<mt-navbar v-model="selected">
  			<mt-tab-item v-for="(item,index) in typeList" :id="index">{{item}}</mt-tab-item>
		</mt-navbar>
		<table class="hot_table">
			<tr v-for="i of Math.ceil(videoList.length/2)">
				<td v-for="j of 2-videoList.length%2" @click="gotoDetail(videoList[2*i+j-3])">
					<div v-if="videoList[2*i+j-3].comment!=-1" class="bg_div" :style="{backgroundImage:'url('+videoList[2*i+j-3].pic+')'}">
						<div class="gray_bg">
							<span>{{videoList[2*i+j-3].author}}</span>
							<div class="fr">
								<b>{{videoList[2*i+j-3].comment}}</b>
								<b>{{videoList[2*i+j-3].favorite}}</b>
							</div>
							
						</div>
					</div>
					<div class="hot_title">
						{{videoList[2*i+j-3].title}}
					</div>
					<div class="type_time" v-if="videoList[2*i+j-3].comment!=-1">
						#{{videoList[2*i+j-3].type}}
						<span>
							{{new Date(videoList[2*i+j-3].time).format('MM-dd')}}
						</span>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
	import slider from './sliderComponent.vue'
	export default{
		name:'video',
		data(){
			return{
				typeList:["精选","自拍达人","随手拍","搞笑视频","网络红人"],
				selected:0,
				videoList:[]
			}
		},
		components:{slider},
		methods:{
			getData(){
				this.$http.get('./static/videoData.json')
				.then(response=>{
					this.videoList=response.data.videoList;
					if (this.videoList.length%2 != 0) {
						var obj = {
							"pic":"",
							"author":"",
							"title":"",
							"type":"",
							"time":"",
							"comment":-1,
							"favorite":-1
						}
						this.videoList.push(obj)
					}
					console.log(this.videoList[0].pic);
				})
			},
			gotoDetail(info){
				this.$store.dispatch('setVideoInfo',info);
				this.$router.push({path:'/imageDetail/video'})
			}
		},
		created(){
			this.getData();
		}
	}
</script>
<style scoped="">
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
		width: 80%;
		height: 2px;
		position: absolute;
		left: 10%;
		bottom: 0;
		content: '';
		background:rgb(242,150,0);
	}
	.hot_table{
		width: 100%;
		background: rgb(250,250,250);
		border-spacing: 10px;
	}
	.hot_table td{
		width: 50%;
		/*background: rgb(250,250,250);*/
		background: white;
		padding: 0;
		padding-bottom: 5px;
		border:1px solid #f4f4f4;
	}
	.hot_table td>div{
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
		height: 100px;
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
	}
	.hot_table td div .gray_bg{
		height: 30px;
		line-height: 30px;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		left: 0;
		bottom: 0;
		color:white;
		font-size: 12px;
		padding: 0 5px;
		width: 100%;
	}
	.gray_bg>span{
		padding-left: 20px;
		display: inline-block;
		width: 45%;
		background: url(../assets/user.png) no-repeat left center;
	}
	.gray_bg>div{
		width:55%;
		text-align:right;
		background-color:transparent;
		color:white
	}
	.hot_table td div.hot_title{
		margin-top: 10px;
		color: #000000;
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		
		
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
	.hot_table td div b{
		font-weight: normal;
		font-size: 10px;
		padding-left: 20px;
		background: no-repeat left center;
		background-size: 20px 20px;
		/*padding-right: 10px;*/
		
	}
	.hot_table td div b:first-child{
		background-image: url('../assets/comment_1.png');
	}
	.hot_table td div b:last-child{
		background-image: url('../assets/favorite_1.png');
	}
	.type_time{
		font-size: 11px;
	}
	.type_time span{
		margin-left: 10px;
	}
</style>