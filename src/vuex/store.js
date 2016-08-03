var Vue = require ('vue');
var Vuex = require('vuex');

Vue.use(Vuex)

var state = {
    info: {
            e_name: '',
            c_name: '',
            group: '',
            contact: {
                qq: '',
                wechat: '',
                call: '',
                mobile: ''
            }
        },
        style: {
            logo: '',
            co_title: '#000000',
            co_item: '#999999',
            co_icon: '#648fe7',
            co_bg:'#eeeeee',
            co_line: '#000050'
        },
        cropper: null,
        flag: {
            showBrowserUnsupport: false,
            needLoadSign: false,
            showColorSetting: false,
            imgHasLoad: false,
            cropperHasInit: false,
            previewHasCreate: false
        },
        img: null,
        helper: {
            support: !!(window.FileReader && window.CanvasRenderingContext2D && (window.URL || window.webkitURL)),

        }
}

var mutations = {
    TOGGLE_FLAG_SHOWCOLORSETTING : function(state){
        console.log('TOGGLE_FLAG_SHOWCOLORSETTING')
        state.flag.showColorSetting = !state.flag.showColorSetting;
    },
    TOGGLE_FLAG_LOADSIGN : function(state){
        console.log('TOGGLE_FLAG_LOADSIGN')
        state.flag.needLoadSign = !state.flag.needLoadSign;
    },
    SET_BROWSERUNSUPPORT : function(state,param){
        console.log(param);
        state.flag.showBrowserUnsupport = param;
    },
    SET_IMGHASLOAD : function(state,param){
        state.flag.imgHasLoad  = param;   
    },
    SET_CROPPER  : function(state,param){
        state.cropper = param   
    },
    SET_CROPPERHASINIT : function(state,param){
        state.flag.cropperHasInit = param;   
    },
    SET_IMG : function(state,param){
        state.img = param;   
    }
}

module.exports = new Vuex.Store({
    state,
    mutations
})