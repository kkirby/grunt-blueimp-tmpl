# grunt-blueimp-tmpl

This grunt plugin will compile [blueimp-tmpl](https://blueimp.github.io/JavaScript-Templates/) templates.

## Example

### Config

```javascript
grunt.initConfig({
	blueimp_tmpl: {
		documentation: {
			src: 'documentation/documentation.tmpl',
			dest: 'readme.md',
			options: {
				data: {
					projectTitle: 'grunt-blueimp-tmpl'
				},
                // Parse tags like <% %> instead of as {% %}
				regexp: /([\s'\\])(?!(?:[^<]|<(?!%))*%>)|(?:<%(=|#)([\s\S]+?)%>)|(<%)|(%>)/g,
				helper: {
                    // Add a helper function to stringify values.
					stringify: function(val){
						returnJSON.stringify(val,null,4);
					}
				},
                // Override loading pattern.
                load: function(file,oldLoader){
                    if(file.substr(0,6) === 'sys://'){
                        file = '/path/to/somewhere/' + file.substr(6);
                    }
                    return oldLoader(file);
                }
			}
		}
	}
});
```

### Run

`grunt blueimp_tmpl`

## Include

The default behavior of including other templates has been overridden. The new method will always load from the filesystem.

## License

Copyright (c) 2015, Kyle Kirbatski

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.