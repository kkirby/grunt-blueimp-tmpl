var tmpl = require('../lib/tmpl');
var fs = require('fs');
var path = require('path');

module.exports = (function(){
	function getLoader(currentSrc){
		return function load(file){
			if(file !== currentSrc){
				if(path.extname(file).length === 0){
					file = file + path.extname(currentSrc);
				}
				if(!path.isAbsolute(file)){
					file = path.resolve(
						path.join(
							path.dirname(currentSrc),
							file
						)
					);
				}
			}
			return fs.readFileSync(
				file
			).toString();
		};
	}
	
	function process(currentSrc,context){
		var options = context.options();
		var loader = getLoader(currentSrc);
		if(options.load){
			var oldLoader = options.load;
			options.load = function(file){
				return oldLoader(file,loader);
			};
		}
		else {
			options.load = loader;
		}
		return tmpl(
			currentSrc,
			options
		);
	}
	
	return function(grunt){
		grunt.registerMultiTask('blueimp_tmpl','Compile tmpl templates.',function(){
			var self = this;
			this.files.forEach(function(file){
				grunt.file.write(
					file.dest,
					process(
						file.src[0],
						self
					)
				);
				grunt.log.writeln('File "' + file.dest + '" created.');
			});
		});
	};
})();