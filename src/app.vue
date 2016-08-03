
<template>
<div>
    <div class="o2_cover">
        <div class="o2_cover_content">
            <div class="title">
                <h2></h2>
                <small></small>
            </div>
            <a href="#" class="o2_cover_btn" v-on:click="toggleLoadSign()">点我</a>
        </div>
    </div>
<!--    <warn></warn>-->
    <main></main>
    
</div>
</template>
<script>
var Cropper = require('./components/cropper.vue');
var Warn = require('./components/warn.vue');
var Main = require('./components/main.vue');
var store= require('./vuex/store.js');
var Actions = require('./vuex/actions');
var Vue = require('vue');

module.exports = {
//    data: function(){
//      return {
//        info: {
//            e_name: '',
//            c_name: '',
//            group: '',
//            contact: {
//                qq: '',
//                wechat: '',
//                call: '',
//                mobile: ''
//            }
//        },
//        style: {
//            logo: '',
//            co_title: '#000000',
//            co_item: '#999999',
//            co_icon: '#648fe7',
//            co_bg:'#eeeeee',
//            co_line: '#000050'
//        },
//        cropper: null,
//        flag: {
//            showBowserUnsupport: false,
//            needLoadSign: false,
//            showColorSetting: false,
//            imgHasLoad: false,
//            cropperHasInit: false,
//            previewHasCreate: false
//        },
//        img: null,
//        helper: {
//            support: !!(window.FileReader && window.CanvasRenderingContext2D && (window.URL || window.webkitURL)),
//            isImage: function(type) {
//                var filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
//                return !!(filter.test(type));
//            }
//        }
//      }  
//    },
    store,
    vuex: {
        actions :{
            toggleLoadSign : Actions.toggleLoadSign,
            setBrowserUnsupport : Actions.setBrowserUnsupport
        }
    },
    components : {
        Cropper : Cropper,
        Warn   : Warn,
        Main : Main,
    },
    methods : {
        checkIfChrome : function(){
            var thisObj = this;
            var reg_Chrome = /chrome\/[\d.]+/gi;
            var browser = navigator.userAgent.match(reg_Chrome);
            if(browser){
                var ver = (browser+'').replace(/[^0-9.]/ig,'').split('.')[0];
                if(parseInt(ver,10) >= 49){
                    this.setBrowserUnsupport(false)
                    return 
                }
            }
            this.setBrowserUnsupport(true);
        }
    },
    ready : function(){
        this.checkIfChrome();
    }
}
</script>











