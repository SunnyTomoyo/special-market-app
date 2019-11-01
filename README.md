# special-market-app

> 一个使用Vue.js构建的商城。仿照https://github.com/Peroluo/easyMarketApp React构建的仿网易严选UI设计的H5 webApp。

> 下载项目启动后，http://(你的电脑IP地址):8080即可访问。手机同一局域网内可直接访问。

> 后台接口参考https://github.com/Peroluo/easyMarketServer

> 本项目需要在node 12版本下才能正常运行sass

#### 功能模块概述及预览截图
- **登录**
    <br/>让用户登录自己的账号，获取个人基本信息。
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/special-market-app/运行截图/10.png" 
           width=275 height=489 />
           
- **我的**
    <br/>主要是显示用户当前所收藏的商品，以及收货地址的编辑。  
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/special-market-app/运行截图/51.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/special-market-app/运行截图/52.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/special-market-app/运行截图/53.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/special-market-app/运行截图/54.png" 
           width=275 height=489 />
    
           
- **发现**
    <br/>主要是显示主页推荐内容。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/8.png" 
           width=275 height=489 />
    
- **朋友**
    <br/>主要是显示当前你关注的博主发的动态。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/9.png" 
           width=275 height=489 />
    
- **视频**
    <br/>主要是推送相关mv等视频。以及点击后的视频详情页。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/11.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/14.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/15.png" 
           width=275 height=489 />
           
- **搜索**
    <br/>主要是显示当前热搜榜，以及搜索后的信息。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/12.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/13.png" 
           width=275 height=489 />
    
- **歌曲播放页**
    <br/>主要是显示当前播放歌曲，可以进行相关切换歌曲、拉进度条、切换播放模式等功能。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/10.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/4.png" 
           width=275 height=489 />
           
- **个人**
    <br/>主要是显示个人信息。   
    
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/5.png" 
           width=275 height=489 />
    <img style="display:inline" src="https://sunnytomoyo.github.io/MyMusic/%E4%B8%8A%E4%BC%A0%E7%9A%84%E5%9B%BE%E7%89%87/6.png" 
           width=275 height=489 />
            
## Build Setup    

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn build

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
