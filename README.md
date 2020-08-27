### 介绍 Intro
这是一个用原生JavaScript(es5)写的图片懒加载插件（模块），并且它很轻，源文件只有4kb，压缩后只有2kb。在长页面场景中，使用图片懒加载是优化网站初始加载速度的一种常见方案。直到用户划到之前不加载可见视图外的图片可以有效减少资源请求链接，可以让浏览器更快地加载其他必要的资源如js。

This is an image lazy loading plugin (module) written in Vanilla JavaScript (es5), and it is very light, the source file is only 4kb, and only 2kb after compression. In a long page scenario, lazy loading of images is a common solution to optimize the initial loading speed of the website. Not loading pictures outside the visible view until the user draws to it can effectively reduce resource request links and allow the browser to load other necessary resources such as js faster.

### 用法 Useage
#### 获取 fetch
```
--yarn--
yarn add lazyload-es5

--git--
git clone https://github.com/1esse/lazyload.git

--npm--
npm i lazyload-es5
```

#### 浏览器原生 native html
```html
<body>
    <img src="thumbnail.jpg" lazy-src="source.jpg">
    <script src="/node_modules/intersection-observer/intersection-observer.js"></script>
    <script src="./lazyload.js"></script>
    <script type="text/javascript">
        var lazy = lazyLoad() // 调用lazyload函数会返回实例化后的对象原型
        // var lazy = new LazyLoad() // 另一种实例化方式，直接自己new一个
    </script>
</body>
```

#### vue
```javascript
<script>
import { lazyload, LazyLoad } from "lazyload-es5";
export default {
  mounted() {
    this.lazy = lazyLoad() // 调用lazyload函数会返回实例化后的对象原型
    // this.lazy = new LazyLoad() // 另一种实例化方式，直接自己new一个
  }
};
</script>
```

此插件会监听所有定义lazy-src属性的图片标签，请务必给所有需要懒加载的图片添加lazy-src属性，并把图片链接赋值给它。懒加载图片的src属性可链接至缩略图。

This plug-in will listen to all image tags that define the lazy-src attribute. Please be sure to add the lazy-src attribute to all images that need to be lazily loaded, and assign the image link to it. The src attribute of the lazy image can be linked to the thumbnail.

插件使用了[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)用作监听图片是否进入浏览器视图窗口，如需配置Intersection Observer API属性，请阅读该[API的属性](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver#%E5%B1%9E%E6%80%A7)文档并在实例化的时候以对象的方式传入参数。

The plug-in uses the [Intersection Observer API](https://developer.cdn.mozilla.net/en-US/docs/Web/API/IntersectionObserver) to monitor whether the image enters the browser view window. If you need to configure the properties of the Intersection Observer API, please read the [API's property](https://developer.cdn.mozilla.net/en-US/docs/Web/API/IntersectionObserver#Properties) document and pass in the parameters as objects when instantiating.

由于各个浏览器对Intersection Observer API的支持情况不同，如需兼容多浏览器（如ie），需要下载polyfill实现的Intersection Observer API模块（`npm i intersection-observer` 或者 `yarn add intersection-observer`），并在此插件执行之前把它引入。原生浏览器参考[上文](#浏览器原生)，vue直接下载就行，但要确保该模块与此插件都在node_modules（同一层目录）下，插件会自动将它引入。如果此插件是通过npm或者yarn下载而不是git clone的，则不需要另行下载intersection-observer，因为下载此插件的时候会自动下载其依赖。

As each browser supports Intersection Observer API differently, if you need to be compatible with multiple browsers (such as ie), you need to download the Intersection Observer API module (`npm i intersection-observer` or `yarn add intersection-observer`) implemented by polyfill, And link it before this plugin is executed. For native html, please refer to [above](#浏览器原生), vue can be downloaded directly, but make sure that the module and this plug-in are in node_modules (same level directory), the plug-in will automatically import it. If this plugin is downloaded through npm or yarn instead of git clone, you don't need to download intersection-observer separately, when you download this plug-in, its dependencies will be downloaded automatically..

### API
#### loadMore()
监听最新的图片资源，新的图片挂载之后可用。

Monitor the latest picture resources, use this function to monitor after new pictures mounting.
```javascript
this.$nextTick(() => { 
  this.lazy.loadMore() // 确保图片已挂载之后再调用此方法监听新图片
})
```
#### destory(load_complete)
取消监听所有图片，参数load_complete若为真，加载剩余所有图片，为假则不加载。

Cancel the monitoring of all pictures. If the parameter load_complete is true, load all the remaining pictures.
```javascript
this.lazy.destory(true) // 取消监听并加载所有图片
```

