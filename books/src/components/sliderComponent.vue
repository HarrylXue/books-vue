<template>
	<div id="slider">
		<section>
			<!-- 绑定内联样式，以保证幻灯图完全显示 -->
			<mt-swipe :auto="4000" :style="{height:height+'px'}">
			  <mt-swipe-item v-for="img in imgList">
			  	<!-- 为img绑定load方法，在图片加载完成后触发 -->
			  	<img v-lazy="img.img" alt="" @load="imgLoded(this)">
				<div v-if="type=='news'" class="news_title">{{img.title}}</div>
			  </mt-swipe-item>
			</mt-swipe>
		</section>
	</div>
</template>
<script>
	export default{
		name:"slider",
		data(){
			return{
				imgList:[],
				height:0
			}
		},
		// 该属性，用于接收父组件传递的值
		props:['type'],
		methods:{
			imgLoded(){
				// 图片加载完成后，获取图片的高度
				this.height = event.target.height;
				console.log("1231231231")
			},
			getSliderData(){
				console.log("------"+this.type)
				var url = "./static/sliderImgData.json?type="
				if (this.type == "news") {
					url="./static/newsList.json?type="
				}
				this.$http.get(url+this.type)
				.then(response=>{
					console.log(response)
					if (this.type == "news") {
						this.imgList = response.data.data.list;
					}else{
						this.imgList = response.data.list;
					}
					
				})
			}
		},
		created(){
			this.getSliderData();
		}
	}
</script>
<style scoped>
	.mint-swipe-item img{
		width: 100%;
	}
	.mint-swipe-items-wrap{
		position: relative;
	}
	.news_title{
		position: absolute;
		left: 10px;
		bottom: 20px;
		color: white;
		font-size: 12px;
	}
</style>