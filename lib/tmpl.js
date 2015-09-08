var _tmpl = require('blueimp-tmpl').tmpl;

module.exports = (function(){
	var regexp = _tmpl.regexp;
	var load = _tmpl.load;
	var helper = _tmpl.helper;
	
	return function tmpl(str,config){
		config = config || {};
		config.helper = config.helper || {};
		if(!config.helper.include){
			config.helper.include = function(key,data){
				_s += tmpl(tmpl.load(key),data);
			};
		}
		if(config.regexp){
			_tmpl.regexp = config.regexp;
		}
		if(config.load){
			_tmpl.load = config.load;
		}
		_tmpl.helper = _tmpl.helper.replace(/,include=[^\}]+\},?/gm,'') + ',' + Object.getOwnPropertyNames(config.helper).map(function(key){
			return key + '=' + config.helper[key].toString()
		}).join(',');
		var result = _tmpl(_tmpl.load(str),config.data || {});
		_tmpl.regexp = regexp;
		_tmpl.load = load;
		_tmpl.helper = helper;
		return result;
	}
})();