<template>
	<div id="follow">
		<mt-header title="关注">
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
		</mt-header>
		<ul>
			<li v-for="item  in followList" @click="gotoDetail(item)">
				<div class="top_line clearfix">
					<div class="fl">
						<img class="avatar" :src="item.avatar" alt="">
						<span>{{item.author}}</span>
					</div>
					<div class="fr">
						{{item.time}}
					</div>
				</div>
				<p v-if="item.category == 'img'">
					<img v-lazy="item.pic" alt="" width="100%">
				</p>
				<p v-if="item.category == 'video'">
					<video :src="item.video" controls :poster="item.pic" width="100%"></video>
				</p>
				<div class="title_label">{{item.title}}</div>
				<div class="type_label">#{{item.type}}</div>
				<div v-if="item.category == 'news'" class="news_content">
					{{item.navContent}}
				</div>
				<div class="bottom_line clearfix">
					<div class="fl">
						<span>{{item.comment}}</span>
						<span>{{item.favorite}}</span>
						<span>{{item.praise}}</span>
					</div>
					<div class="fr">
						分享
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:"follow",
		data(){
			return{
				followList:[]
			}
		},
		methods:{
			getData(){
				this.$http.get('./static/followData.json')
				.then(response=>{
					this.followList = response.data.followList;
					console.log(this.followList)
				})
			},
			gotoDetail(info){
				if (info.category == 'news') {
					this.$store.dispatch('setNewsInfo',info);
				}else if(info.category == "video"){
					this.$store.dispatch('setVideoInfo',info);
				}else{
					this.$store.dispatch('setInfoId',info.id);
				}
				this.$router.push({path:'/imageDetail/'+info.category})
			}
		},
		created(){
			this.getData();
		}
	}
</script>
<style scoped>
	ul{
		background: #f2f2f2;
	}
	li{
		padding: 10px 0;
		margin-bottom: 10px;
		background: white;
	}
	li>div{
		padding: 0 10px;
	}
	.avatar{
		width: 40px;
		border-radius: 50%;
		margin-right: 10px;
		vertical-align:middle;
	}
	.top_line img,.top_line span{
		vertical-align: middle;
		color: #2d2d2d;
		font-size: 13px;
	}
	.top_line div:last-child{
		text-align: right;
		line-height: 40px;
		color: #919191;
		font-size: 11px;
		padding-left: 20px;
		background: url(../assets/clock.png) no-repeat left center;
		background-size: 18px;
	}
	p{
		margin: 10px 0;
	}
	.title_label{
		font-size:15px;
		color: #2d2d2d;
		margin-top: 10px;
	}
	.type_label{
		font-size: 10px;
		color: #919191;
		margin: 10px 0;
	}
	.news_content{
		font-size: 12px;
		color: #919191;
		padding: 10px;
		line-height: 20px;
	}
	.bottom_line{
		font-size: 12px;
		color: #919191;
	}
	.bottom_line div span:first-child{
		padding-left: 23px;
		background: url(../assets/comment.png) no-repeat left center;
	}
	.bottom_line div span:nth-child(2){
		padding-left: 23px;
		background: url(../assets/favorite.png) no-repeat left center;
	}
	.bottom_line div span:last-child{
		padding-left: 23px;
		background: url(../assets/praise_small.png) no-repeat left center;
		background-size: 18px;
		margin-left: 5px;
	}
	.bottom_line .fr{
		padding-left: 20px;
		background: url(../assets/share_small.png) no-repeat left center;
		background-size: 18px;
	}
</style>