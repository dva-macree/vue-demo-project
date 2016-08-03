<template>
    <div class="o2_box">
			<span class="o2_box_type">预览</span>
			<span class="o2_color_setting" title="配色设置" v-on:click="flag.showColorSetting = !flag.showColorSetting">配色</span>
			<div class="o2_sign" id="sign" :style="{ backgroundColor:style.co_bg }" >
				<div class="logo">
					<img alt="logo" v-on:click="flag.showColorSetting = !flag.showColorSetting">
				</div>
				<div class="img">
					<img alt="头像">
				</div>
				<div class="line" :style="{ backgroundColor:style.co_line }"></div>
				
			</div>
		</div>
</template>
<script>
    var Vue = require('vue');
    var Getters = require('../vuex/getters');
Vue.filter('formatTelNo', function(val) {
    if (val) {
        if (val.indexOf('-') !== -1) return val;
        var arr = val.split('');
        var resArr = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            resArr.push(arr[i]);
            if ((i === 2 || ((i - 2) % 4 === 0)) && i !== (len - 1)) {
                resArr.push('-');
            }
        }
        return resArr.join('');
    }
});
    
Vue.filter('formatOfficeNo', function(val) {
    if (val) {
        if (val.indexOf('-') !== -1) return val;
        var num = val ? val : '1234';
        return '' + num;
    }
});

module.exports = {
//    props : ['showColorSetting','style','info']
    vuex : {
         getters :{
            style : Getters.getStyle,
            info : Getters.getInfo,
            flag : Getters.getFlag
        },
        actions : {
            
        }   
    }
}
</script>