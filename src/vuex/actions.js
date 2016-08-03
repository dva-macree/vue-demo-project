module.exports.toggleShowColorSetting = function({dispatch}) {dispatch('TOGGLE_FLAG_SHOWCOLORSETTING');}

module.exports.toggleLoadSign = function({dispatch}) {dispatch('TOGGLE_FLAG_LOADSIGN');}

module.exports.setBrowserUnsupport = function({dispatch},param){dispatch('SET_BROWSERUNSUPPORT',param)};

module.exports.setImgHasLoad = function({dispatch},param){dispatch('SET_IMGHASLOAD',param)}

module.exports.setCropper = function({dispatch},param){dispatch('SET_CROPPER',param)}

module.exports.setCropperHasInit = function({dispatch},param){dispatch('SET_CROPPERHASINIT',param)}


module.exports.setImg = function({dispatch},param){dispatch('SET_IMG',param)}