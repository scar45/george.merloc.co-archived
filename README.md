## Portfolio site of George Merlocco 
#### http://george.merloc.co
---
This is my personal portfolio website that I've chosen to open source so that you can see exactly how I work. This project uses the [gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) build system and a host of dependencies to optimize all output. Some of the kits included are:

- SASS w/Source Maps (node-sass + gulp-sass + gulp-sourcemaps)
- jQuery (w/ gulp-jquery)
- Image Minifier (gulp-imagemin)
- CSS + JS File Includes (gulp-include)
- [Browsersync](http://www.browsersync.io) for live coding (browser-sync)

### Getting it running
--- 
**Install dependencies:**
```
npm install
```
**Build first to ensure all's well:**
```
gulp release
```
- This should dump files in a ./build directory, which you can serve up.

**Setup a watch environment to build and refresh a live server:**
```
gulp liveCoding
```
- This will run a live server (Browsersync) on port 3000, with a Web UI on port 3001.
    
---

...and that's about it! A live copy of this site should be found @ http://george.merloc.co

Thanks for checking me out!

_.end_