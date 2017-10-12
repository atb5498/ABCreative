var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
	root: appRoot,
	html: [
		appRoot + "**/*.html",
    "!" + appRoot + "**/partials/**",
		"!" + appRoot + "**/templates/**",
	],
	css: appRoot + "**/*.css",	
	img: appRoot + "**/*.{ico,png,jpg,jpeg}",	
  output: outputRoot
}