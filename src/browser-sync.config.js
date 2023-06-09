module.exports = {
	proxy: "http://localhost:3002/",
	notify: false,
	files: ["build/css/*.min.css", "build/js/*.min.js", "**/*.php"],
};