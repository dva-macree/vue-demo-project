<template>
    <div class="o2_main" v-bind:class="{'show':flag.needLoadSign}" >
		<span class="o2_main_close" v-on:click="toggleLoadSign()"></span>
		<!-- S preview -->
        <preview></preview>
		<!-- E preview -->

		<!-- S content -->
		<content></content>
		<!-- E content-->
	</div>
</template>
<script>
var Content = require('./content.vue');
var Preview = require('./preview.vue');
var Getters = require('../vuex/getters');
var Actions = require('../vuex/actions');
module.exports = {
    vuex :{
      getters :   {
        flag : Getters.getFlag   
      },
        actions : {
            toggleLoadSign : Actions.toggleLoadSign
        }
    },
    components : {
        Content : Content,
        Preview : Preview
    }
}
</script>
