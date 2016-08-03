var Vue = require('vue')
var App = require('./app.vue')
//require('../css/common/app.css')
require('./stylesheets/sign.s.css');
require('./stylesheets/cropper.min.css')
new Vue({
    el : 'body',
    components : {
        app : App   
    }
});