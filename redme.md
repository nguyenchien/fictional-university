********************************
  Plugin use for site
********************************
1. Advanced Custom Fields
2. Members - Membership & User Role Editor Plugin
3. Regenerate Thumbnails

********************************
  FIX for live reload / browser sync / browsersync
********************************

1. Install Browser Sync: npm install browser-sync


2. Install NPM Run All: npm install npm-run-all


3. Create a new file in the src folder called `browser-sync.config.js` with this code inside it:
module.exports = {
	proxy: "path-local-dev",
	notify: false,
	files: ["build/css/*.min.css", "build/js/*.min.js", "**/*.php"],
};

4. Then, open package.json and make sure your "scripts" section looks like this:
"scripts": {
    "watch-bs": "npm-run-all --parallel sync start",
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "sync": "browser-sync start --config src/browser-sync.config.js",
    "dev": "wp-scripts start",
    "devFast": "wp-scripts start",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

5. Now, instead of running `npm run start` you will use `npm run watch-bs`