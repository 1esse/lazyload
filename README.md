### 介绍
这是一个用原生JavaScript(es5)写的图片懒加载插件（模块），并且它足够小，源文件只有4kb，压缩后只有2kb。在长页面场景中，使用图片懒加载是优化网站初始加载速度的一种常见方案。直到用户划到之前不加载可见视图外的图片可以有效减少资源请求链接，给其他必要资源如（js）加载腾出位置。

### 用法
#### 获取
```
--yarn--
yarn add lazyload-es5

--git--
git clone https://github.com/1esse/lazyload.git

--npm--
npm i lazyload-es5
```

#### 浏览器原生
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

此插件会监听所有定义lazy-src属性的图片标签，请务必给所有需要懒加载的图片添加lazy-src属性，并把图片链接赋值给它。懒加载图片的src可链接至缩略图。

插件使用了[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)用作监听图片是否进入浏览器视图窗口，如需配置Intersection Observer API属性，请阅读该[API的属性](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver#%E5%B1%9E%E6%80%A7)文档并在实例化的时候以对象的方式传入参数。

由于各个浏览器对Intersection Observer API的支持情况不同，如需兼容多浏览器（如ie），需要下载polyfill实现的Intersection Observer API模块，并执行在此插件之前把它引入。原生浏览器参考[上文](#浏览器原生)，vue直接下载就行，但要确保他们都在node_modules（同一层目录）下。

### API
#### loadMore()
监听最新的图片资源，新增图片数据并挂载之后可用。
```javascript
this.$nextTick(() => { 
  this.lazy.loadMore() // 确保图片已挂载之后再调用此方法监听新图片
})
```
#### destory(load_complete)
取消监听所有图片，参数load_complete若为真，加载剩余所有图片，为假则不加载。
```javascript
this.lazy.destory(true) // 取消监听并加载所有图片
```

