## Portfolio site of George Merlocco 
#### http://george.merloc.co
---
This is my personal portfolio website that I've chosen to open source so that you can see exactly how I work. This project uses the [gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) build system and a host of dependencies to optimize all output. Some of the kits included are:

- SASS w/Source Maps (node-sass + gulp-sass + gulp-sourcemaps)
- jQuery (via bower)
- HTML + CSS + JS + Image Minifier (gulp-minify-html + gulp-minify-css + gulp-uglify + gulp-imagemin)
- CSS + JS File Includes (gulp-file-include)
- [Browsersync](http://www.browsersync.io) for live coding (browser-sync)

## Requirements

- [Node.js](http://nodes.org)
- [Gulp.js](http://gulpjs.com)
- [Bower](http://bower.io)

### Getting it running
--- 
**Install dependencies:**
```
npm install
bower install jquery
```
**Start a first build, then spawn webserver for live coding (browser-sync):**
```
gulp
```
- This will dump compiled/processed files in a ./build directory, which will then be served by browser-sync.

---

...and that's about it! A live copy of this site should be found @ http://george.merloc.co

Thanks for checking me out!

_.end_