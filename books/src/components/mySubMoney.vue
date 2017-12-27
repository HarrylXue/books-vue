<template>
	<div id="money">
		<mt-header title="我的余额">
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button> 		
	    	<mt-button icon="more" class="settings" slot="right"></mt-button>	  		
		</mt-header>
		<div class="viewbg">
			<img src="../assets/money_bg.png" alt="">
			<div class="info_box">
				<div class="money_logo">
					<img src="../assets/money_logo.png" alt="">
				</div>
				<div class="money_info clearfix">
					<div class="left_box fl">
						<div>可用金额</div>
						<div>{{moneyFormat}}</div>
					</div>
					<div class="right_box fl">
						<div>冻结金额</div>
						<div>{{coldMoney}}</div>
					</div>
				</div>
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
			<li class="clearfix" v-for="item in moneyList">
				<div class="fl">
					<div class="title_label">{{item.title}}</div>
					<div class="date_label">{{item.date}}</div>
				</div>
				<div class="fr">
					<div class="type_label">
						{{item.type==1?'收益':'支出'}}
					</div>
					<div class="money_label" :class="{outType:item.type==0}">
						{{item.type==1?'+':'-'}}{{item.money}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:"money",
		data(){
			return{
				selected:'1',//当前选中的状态
				oldValue:'1',//之前的状态
				moneyList:[],
				allList:[]
			}
		},
		computed:{
			userInfo(){
				return this.$store.getters.getUserInfo;
			},
			// 金额千分位处理
			moneyFormat(){
				// 先将金额转换成字符串
				var moneyStr = this.userInfo.canUseMoney+"";
				// 将整数部分和小数部分分离
				var strArr = moneyStr.split('.')
				// 将整数部分的数字一一切割出来，并进行反转
				var nums = strArr[0].split('').reverse()
				// 遍历数组，并在合适的位置添加","
				var m='';
				for (var i = 0; i < nums.length; i++) {
					m+=nums[i];
					// 判断是否需要追加逗号
					if ((i+1)%3==0 && i<nums.length-1) {
						m+=","
					}
				}
				// 处理无小数点的部分
				var subStr=''
				if (strArr[1]) {
					subStr = strArr[1]
				}
				// 得到转换结果
				return m.split('').reverse().join('')+'.'+subStr;
			},
			coldMoney(){
				// 先将金额转换成字符串
				var moneyStr = this.userInfo.coldMoney+"";
				// 将整数部分和小数部分分离
				var strArr = moneyStr.split('.')
				// 将整数部分的数字一一切割出来，并进行反转
				var nums = strArr[0].split('').reverse()
				// 遍历数组，并在合适的位置添加","
				var m='';
				for (var i = 0; i < nums.length; i++) {
					m+=nums[i];
					// 判断是否需要追加逗号
					if ((i+1)%3==0 && i<nums.length-1) {
						m+=","
					}
				}
				// 处理无小数点的部分
				var subStr=''
				if (strArr[1]) {
					subStr = '.'+strArr[1]
				}
				// 得到转换结果
				return m.split('').reverse().join('')+subStr;
			}
		},
		methods:{
			getData(){
				this.$http.get('./static/myIncome.json')
				.then(response=>{
					this.moneyList = response.data.moneyList;
					this.allList = response.data.moneyList;
				})
			}
		},
		created(){
			this.getData()
		},
		updated(){
			
			if (this.selected == this.oldValue) {
				console.log("-=-=-=-=+"+this.selected+"====="+ this.oldValue)
				return;
			}
			this.oldValue = this.selected;
			switch(this.selected){
				case '1':
					this.moneyList = this.allList;
				break;
				case '2':
					this.moneyList = [];
					for (var i = 0; i < this.allList.length; i++) {
						if (this.allList[i].type == 0) {
							this.moneyList.push(this.allList[i])
						}
					}
				break;
				case '3':
					this.moneyList = [];
					for (var i = 0; i < this.allList.length; i++) {
						if (this.allList[i].type == 1) {
							this.moneyList.push(this.allList[i])
						}
					}
				break;
			}
		}
	}
</script>
<style scoped="">
	#money{
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
	.content{
		width: 100%;
		background: #f5f5f5;
		padding-top: 10px;
	}
	.info_box{
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		bottom: 0;
	}
	.money_logo{
		text-align: center;
		margin-top: 60px;
	}
	.money_logo img{
		width: 60px;
	}
	.money_info>div{
		width: 50%;
		height: 60px;
		/*border: 1px solid red;*/
		position: relative;
		color: white;
		text-align: center;
	}
	.money_info>div>div:first-child{
		font-size: 13px;
		height: 30px;
		line-height: 30px;
	}
	.money_info>div>div:last-child{
		font-size: 18px;
		font-weight: bold;
		height: 30px;
		line-height: 30px;
	}
	.money_info>div:first-child:after{
		position: absolute;
		right: -0.5px;
		top:22%;
		height: 56%;
		width: 1px;
		content: '';
		background-color: white;
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
	.money_label{
		color: #f4b559;
		font-size: 13px;
		font-weight: bold;
		text-align: right;
	}
	.outType{
		color: #e34115;
	}
</style>