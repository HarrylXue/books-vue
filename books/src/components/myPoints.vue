<template>
	<div id="point">
		<mt-header title="我的积分">
			<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button> 		
	    	<mt-button icon="more" class="settings" slot="right"></mt-button>	
		</mt-header>
		<div class="viewbg">
			<img src="../assets/score_bg.png" alt="">
			<div class="info_box" clearfix>
				<div class="points_box">
					<span>94580</span>
					<div>可用积分</div>

				</div>
				<div class="right_box fr">积分兑换</div>
			</div>
		</div>
		<div class="content">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">全部</mt-tab-item>
			  <mt-tab-item id="2">支出</mt-tab-item>
			  <mt-tab-item id="3">收益</mt-tab-item>
			</mt-navbar>
		</div>
		<ul>
			<li class="clearfix" v-for="item in pointList">
				<div class="fl">
					<div class="title_label">{{item.title}}</div>
					<div class="date_label">{{item.date}}</div>
				</div>
				<div class="fr">
					<div class="type_label">
						{{item.type==1?'收益':'支出'}}
					</div>
					<div class="point_label" :class="{outType:item.type==0}">
						{{item.type==1?'+':'-'}}{{item.point}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>

	export default{
		name:"point",
		data(){
			return{
				selected:'1',//当前选中的状态
				oldValue:'1',//之前的状态
				pointList:[],
				allList:[]
			}
		},
		methods:{
			getData(){
				this.$http.get('./static/myIncome.json')
				.then(response=>{
					this.pointList = response.data.pointList;
					this.allList = response.data.pointList;
				})
			}
		},
		created(){
			this.getData()
		},
		updated(){
			console.log(this.allList)
			if (this.selected == this.oldValue) {
				console.log("-=-=-=-=+"+this.selected+"====="+ this.oldValue)
				return;
			}
			this.oldValue = this.selected;
			switch(this.selected){
				case '1':
					this.pointList = this.allList;
				break;
				case '2':
					this.pointList = [];
					for (var i = 0; i < this.allList.length; i++) {
						if (this.allList[i].type == 0) {
							this.pointList.push(this.allList[i])
						}
					}
				break;
				case '3':
					this.pointList = [];
					for (var i = 0; i < this.allList.length; i++) {
						if (this.allList[i].type == 1) {
							this.pointList.push(this.allList[i])
						}
					}
				break;
			}
		}
	}
</script>
<style scoped>
	#point{
		position: relative;
	}
	.mint-header{
		background-color: transparent;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 1999;
	}
	.viewbg{
		position: relative;
	}
	.viewbg img{
		width: 100%;
		position: relative;
		z-index: -1;
	}
	.info_box{
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		bottom: 0;
	}
	.points_box{
		text-align: center;
		margin-top: 120px;
		color: white;
	}
	.points_box span{
		font-size: 23px;
		font-weight: bold;
	}
	.points_box div{
		font-size: 11px;
	}
	.info_box button{
		border: none;
	}
	.right_box{
		color: #f3b253;
		background-color: white;
		padding: 10px 15px;
		border-radius: 22px 0 0 22px;
		margin-top: -50px;
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
	ul{
		margin-top: 10px;
		padding: 0 10px;
	}
	li{
		padding: 15px 0px;
		border-bottom: 1px solid #f0f0f0;
	}
	.title_label{
		color: #2d2d2d;
		font-size: 13px;
		line-height: 30px;
	}
	.date_label{
		color: #919191;
		font-size: 11px;
	}
	.type_label{
		color: #2d2d2d;
		font-size: 13px;
		line-height: 30px;
	}
	.point_label{
		color: #f4b559;
		font-size: 13px;
		font-weight: bold;
		text-align: right;
	}
	.outType{
		color: #e34115;
	}
</style>