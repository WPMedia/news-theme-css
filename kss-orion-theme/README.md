KSS Orion Theme
=================

This is a basic template for [kss-node](https://github.com/kss-node/kss-node) styleguide. 
"kss-node" is a NodeJS implementation of [Knyle Style Sheets](https://github.com/kneath/kss) (KSS).

Screenshot
--------

<p align="center">
   <img width="750" height="418" src="https://raw.githubusercontent.com/WebDevLuke/kss-orion-theme/master/misc/screen.png" style="border:1px solid #ddd;">
</p>


How to use this template
--------------------------
1. Install kss-node. Type `npm install kss` or `npm install -g kss` for global CLI.
2. git clone `https://github.com/WebDevLuke/kss-orion-theme.git`.
3. Install project dependancies `npm install`.
3. Install gulp global client if you haven't already. Type `npm install -g gulp`.
4. Type `gulp build` to compile the template into `kss-orion-theme/dist`.
5. Copy the contents of `kss-orion-theme/dist` into a folder within your working style guide directory.
6. Run `kss-node` command with `--template` option, like below.

```
kss-node <sourcedir> --template path/to/templatefolder
```

Alternatively if you're using Gulp you can set up a task to compile your style guide by adapting the below:

```
var options = {};
options.styleGuide = {
	"source": [
	  "dev/"
	],
	"destination":  "styleguide/dist/",
	"css": [
	  "../../dist/css/style.css"
	],
	homepage: '../../styleguide/kss-orion-theme/homepage.md',
	title: 'Style Guide',
	template: "path/to/templatefolder"
};

gulp.task('styleguide', function(cb) {
	kss(options.styleGuide, cb);
});
```