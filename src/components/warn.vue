<template>
    <div class="o2_warn" v-bind:class="{'show' : flag.showBrowserUnsupport}">
        为了更好地体验功能，请将浏览器切换或升级至Chrome 49.x 版本以上，感谢支持！
    </div>
</template>


<script>
var Actions = require('../vuex/actions');
var Getters = require('../vuex/getters');
module.exports = {
    vuex : {
        getters :{
            flag : Getters.getFlag
        },
        actions :{
            
        }
    }
}
</script>
