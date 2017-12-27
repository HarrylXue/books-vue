<template>
	<div id="message">
		<mt-header>
	  		<mt-button icon="back" slot="left" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
	  		<router-link to="/" slot="right">
	    		<mt-button icon="settings" class="settings"></mt-button>
	  		</router-link>

		</mt-header>
		<div>该功能尚在开发。。。</div>
	</div>
</template>
<script>
	export default{
		name:"message",
		data(){
			return{

			}
		}
	}
</script>
<style scoped>
	
</style>