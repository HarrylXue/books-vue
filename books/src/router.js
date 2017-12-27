import Home from "./components/homepage.vue"
import ImageDetail from "./components/imageDetail.vue"
import Category from "./components/categoryPage.vue"
import ProfitDetail from './components/profitDetail.vue'
import NewsList from './components/newsList.vue'
import VideoPage from './components/videoView.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import FollowPage from './components/followPage.vue'
import loginView from './components/login.vue'
import UserCenter from './components/userCenter.vue'
import Getback from './components/getbackPwd.vue'
import MoneyView from './components/mySubMoney.vue'
import Points from './components/myPoints.vue'
import Collect from './components/myCollect.vue'
import Message from './components/myMessage.vue'

export default[
	{path:'/home',component:Home},
	{path:'/imageDetail/:type',component:ImageDetail},
	{path:'/category/:type',component:Category},//表示该路径需要传一个值到下级页面
	{path:'/profitDetail',component:ProfitDetail},
	{path:'/news',component:NewsList},
	{path:'/follow',component:FollowPage},
	{path:'/login',component:loginView},
	{path:'/userCenter',component:UserCenter},
	{path:'/register',component:Register},
	{path:'/video',component:VideoPage},
	{path:'/getback',component:Getback},
	{path:'/money',component:MoneyView},
	{path:'/points',component:Points},
	{path:'/collect',component:Collect},
	{path:'/message',component:Message},
	{path:'/',component:Home},
	{path:'*',component:Home}
]