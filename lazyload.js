
(function (root) {
    "use strict";
    if (typeof exports === 'object' && typeof IntersectionObserver !== 'function') {
        try {
            require('../intersection-observer/intersection-observer.js')
        } catch (err) {
            console.error("Can't find intersection-observer module, pls install it first.")
        }
    }
    var LazyLoad = function (options) {
        if (typeof IntersectionObserver !== 'function') return this._compatibilityError()
        if (options && Object.prototype.toString.call(options) !== '[object Object]') console.error("Argument type must be object.")
        if (!options) options = {}
        this.options = {}
        this.options.root = options.root || null
        this.options.rootMargin = options.rootMargin || "0px"
        this.options.threshold = options.threshold || 0
        this.init()
    }
    LazyLoad.prototype.init = function () {
        this.observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i]
                if (entry.isIntersecting === undefined && entry.intersectionRatio === undefined) return this._compatibilityError()
                if (entry.isIntersecting === undefined ? entry.intersectionRatio > 0 : entry.isIntersecting) {
                    var node = entry.target
                    this.observer.unobserve(node)
                    if ('img' !== node.tagName.toLowerCase()) continue
                    this._loadPic(node)
                }
            }
        }.bind(this), this.options)
        this.loadMore()
    }
    LazyLoad.prototype.loadMore = function () {
        var pic_nodes = this._capturePics()
        for (var i = 0; i < pic_nodes.length; i++) {
            this.observer.observe(pic_nodes[i])
        }
    }
    LazyLoad.prototype.destory = function (load_complete) {
        if (load_complete) this._loadAllPics()
        this.observer.disconnect()
    }
    LazyLoad.prototype._capturePics = function () {
        var pic_nodes = document.querySelectorAll('img[lazy-src]')
        return pic_nodes
    }
    LazyLoad.prototype._loadPic = function (node) {
        var img_lazy_src = node.getAttribute('lazy-src')
        node.removeAttribute('lazy-src')
        if (img_lazy_src) node.setAttribute('src', img_lazy_src)
    }
    LazyLoad.prototype._compatibilityError = function () {
        this._loadAllPics()
        console.error("The browser is not (complete) support IntersectionObserver function.You can try to install intersection-observer module and link(or require in commonjs) it before this module to solve this problem.")
    }
    LazyLoad.prototype._loadAllPics = function () {
        var pic_nodes = this._capturePics()
        for (var i = 0; i < pic_nodes.length; i++) {
            this._loadPic(pic_nodes[i])
        }
    }
    function lazyload(options) {
        return new LazyLoad(options)
    }
    if (typeof exports === 'object') {
        module.exports = {
            LazyLoad: LazyLoad,
            lazyload: lazyload
        }
    }
    else {
        root.LazyLoad = LazyLoad
        root.lazyload = lazyload
    }
})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : {}))

