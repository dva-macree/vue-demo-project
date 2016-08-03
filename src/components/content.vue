<template>
    <div class="o2_content" >
			<div class="o2_content_slider" v-bind:class="{'slide':flag.showColorSetting}">
				<!-- S input -->
				<div class="o2_form">
					<div class="o2_form_row o2_input_required">
						<label for="image" class="o2_label">头像</label>
						<div class="o2_input_file">
							<span class="o2_input_name">上传图片</span>
							<input type="file" class="J_uploadImage" data-dest="img">
						</div>
					</div>
					<div class="o2_form_row">
						<label for="c_name" class="o2_label">中文名</label>
						<input type="text" class="o2_input_text"  name="c_name" placeholder="中文名" v-model="info.c_name" debounce="500">
					</div>
					<div class="o2_btns btn_download">
						<a href="javascript:;" class="o2_btn bg1 " v-on:click="downloadRes()">生成签名</a>	
					</div>
				</div>
				<!-- E input -->
				<!-- S more -->
				<div class="o2_form">
					<div class="o2_form_row">
						<label  class="o2_label">Logo</label>
						<div class="o2_input_file">
							<span class="o2_input_name">上传图片</span>
							<input type="file" class="J_uploadImage" data-dest="logo">
						</div>
					</div>
					<div class="o2_form_row">
						<label  class="o2_label">分割线</label>
						<div class="o2_input_color">
							<input type="color"  v-model="style.co_line">
							<input type="text" class="o2_input_text"  v-model="style.co_line | formatColor" debounce="500">
						</div>
					</div>
					<div class="o2_form_row">
						<label  class="o2_label">名字\分组</label>
						<div class="o2_input_color">
							<input type="color"  v-model="style.co_title">
							<input type="text" class="o2_input_text"  v-model="style.co_title | formatColor" debounce="500">
						</div>
					</div>
					<div class="o2_form_row">
						<label  class="o2_label">个人信息</label>
						<div class="o2_input_color">
							<input type="color"  v-model="style.co_item">
							<input type="text" class="o2_input_text"  v-model="style.co_item | formatColor" debounce="500">
						</div>
					</div>
					<div class="o2_form_row">
						<label  class="o2_label">图标颜色</label>
						<div class="o2_input_color">
							<input type="color"   v-model="style.co_icon">
							<input type="text" class="o2_input_text"  v-model="style.co_icon | formatColor"  debounce="500">
						</div>
					</div>
					<div class="o2_form_row">
						<label  class="o2_label">面板底色</label>
						<div class="o2_input_color">
							<input type="color" v-model="style.co_bg">
							<input type="text" class="o2_input_text"  v-model="style.co_bg | formatColor" v-validate="{color:style.co_bg}">
						</div>
					</div>
					<div class="o2_btns">
						<a href="javascript:;" class="o2_btn bg2" v-on:click="resetColors()">重置</a>
						<a href="javascript:;" class="o2_btn bg1" v-on:click="flag.showColorSetting=false">保存并返回</a>
					</div>
				</div>
				<!-- E more-->
			</div>
		</div>
<!--    <cropper></cropper>-->
<div class="o2_alert_mask" v-bind:class="{'show':flag.imgHasLoad}" ></div>
	<div class="o2_alert" v-bind:class="{'show':flag.imgHasLoad}" >
		<span class="o2_alert_close" v-on:click="setImgHasLoad(false)"></span>
		<div class="cropper">
			<div class="cropper_box" id="cropperBox">
				<img src="http://fpoimg.com/200x200" style="width:100px;height:100px;" id="uploadPreview">
			</div>
			<div class="cropper_res_wrap">
				<div class="cropper_res" id="cropperRes">
					<img src="http://fpoimg.com/200x200" style="width:100px;height:100px;">
				</div>
			</div>
		</div>
		<div class="o2_btns cropper_btn">
			<a href="javascript:;" class="o2_btn bg1" v-on:click="finishCropImage()">完成</a>
		</div>
	</div>
</template>


<script>
    var Vue = require('vue');
    var Getters = require('../vuex/getters');
    var Actions = require('../vuex/actions');
//    var Cropper = require('../components/cropper.vue');
    var Cropper = require('../vendors/cropper.min.js');
    var domtoimage = require('../vendors/dom-to-image.min.js');
    var saveAs = require('../vendors/FileSaver.min.js');
    Vue.filter('formatColor',{ // 格式化颜色值，允许#RRGGBB、#RGB形式
    read: function(value){
        return value.toUpperCase();
    },
    write: function(value,OldVal){
        if(/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)){
           var len = value.length;
           var newValue = '';
           if(len == 4) {
              var tmp = value.split('').splice(1);
              newValue = tmp.map(function(item){
                return item + item; 
              });
              return '#' + newValue.join('').toUpperCase();
           }
           return value.toUpperCase();
        }else {
            return value;
        }
    }
});
    // directive
Vue.directive('validate', {
    update: function(value){
        if(value.hasOwnProperty('color')){ //检测颜色值是否有效
            var thisEl = this.el;
            if(!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value.color)){
                console.log(value.color);
                thisEl.classList.add('error');
            }else {
                if(thisEl.classList.contains('error')){
                    thisEl.classList.remove('error');
                }
            }
        }
    }
})
module.exports = {
//    props : ['style','info','showColorSetting']   
    vuex : {
        getters :{
            style : Getters.getStyle,
            info : Getters.getInfo,
            flag : Getters.getFlag,
            helper : Getters.getHelper,
            cropper : Getters.getCropper,
            img : Getters.getImg
        },
        actions : {
             toggleShowColorSetting : Actions.toggleShowColorSetting,
            setImgHasLoad : Actions.setImgHasLoad,
            setCropper : Actions.setCropper,
            setCropperHasInit : Actions.setCropperHasInit,
            setImg : Actions.setImg
        }
    },
    ready : function(){
        this.bindLoadImgEvent();
    },
    methods : {
        isImage: function(type) {
                var filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                return !!(filter.test(type));
        },
        bindLoadImgEvent : function(){
            var thisObj = this;
            if(!this.helper.support)
                return ;
            var uploadPreview = document.getElementById('uploadPreview');
            var uploadImages = document.querySelectorAll('.J_uploadImage');
            var reader = new FileReader();
            var URL = window.URL || window.webkitURL;
            var blobURL;
            var len = uploadImages.length;
            for(var i = 0; i < len ; i++){
                uploadImages[i].addEventListener('change',function(){
                    var files = this.files;//TODO
                    if(files.length == 0) return ;
                    var file = files[0];
                    if(!thisObj.isImage(file.type)){
                        alert ('you have to select an image file') ;
                        return ;
                    }
                    reader.readAsDataURL(file);
                    blobURL = URL.createObjectURL(file);
                    if(thisObj.cropper){
                        thisObj.cropper.reset();   
                    }
                    thisObj.setImgHasLoad(true);
                    thisObj.setImg(this.dataset.dest);
                })   
            }
            
            reader.onload = function(e) {
                uploadPreview.src = e.target.result;
                if (!thisObj.flag.cropperHasInit) {
                    thisObj.loadCropper();
                    return;
                }
                thisObj.cropper.replace(blobURL);
            }
        },
        loadCropper : function(){
            var thisObj = this;
            var image = document.querySelector('#cropperBox > img');
            var preview = document.getElementById('cropperRes');
            var previewImage = preview.getElementsByTagName('img').item(0);
            var option = {
                aspectRatio : 1/1,
                build : function(){
                    previewImage.src = image.src;   
                },
                crop : function(data){
                    var cropper = this.cropper;
                    var imageData = cropper.getImageData();
                    var previewAspectRatio = data.width / data.height;
                    
                    var previewWidth = preview.offsetWidth;
                    var previewHeight = previewWidth / previewAspectRatio;
                    var imageScaledRatio = data.width / previewWidth;
                    
                    preview.style.height = previewHeight + 'px';
                    previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
                    previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
                    previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
                    previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
                }
            };
//            thisObj.cropper = new Cropper(image,option);
            this.setCropper(new Cropper(image,option));
//            thisObj.flag.cropperHasInit = true;
            this.setCropperHasInit(true);
        },
        resetColors : function(){
            var thisObj = this;
//            thisObj.style
        },
        finishCropImage : function(){
            var thisObj = this;
            var croppedCanvas = thisObj.cropper.getCroppedCanvas({
                width: 200,
                height: 200
            });
            var imgDataUrl = croppedCanvas.toDataURL();
            var where = '.o2_sign .' + thisObj.img + ' img';
            document.querySelector(where).src = imgDataUrl;
            thisObj.setImgHasLoad(false);
        },
        downloadRes: function() {// 利用DomToImage库输出签名图
            var thisObj = this;
            var sign = document.getElementById('sign');
            var imgName = this.info.e_name; 
            domtoimage.toBlob(sign).then(function(blob){ 
                saveAs.saveAs(blob,imgName + '.png');
            });
        }
    },
//    components : {
//        Cropper : Cropper   
//    }
}

</script>
