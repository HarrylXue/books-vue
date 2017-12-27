<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
body{
  margin: 0;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0
}

li {
  /*display: inline-block;*/
  margin: 0;
}

a {
  color: #42b983;
}
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
  a{
    color:rgb(45,45,45);
    text-decoration: none;
  }
</style>
