// COPYRIGHT (c) 2015 Joshua Bemenderfer (Tribex)
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// The build file for Muon. Transpiles src/muon.es6 through babel, then umd, then uglify.

var fs = require('fs')
var gulp = require('gulp')
var replace = require('gulp-replace')
var rename = require('gulp-rename')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var umd = require('gulp-umd')
var livereload = require('gulp-livereload')

gulp.task('transpile', function(done) {
  try {
    var packageDef = JSON.parse(fs.readFileSync('./package.json'))
    
    gulp.src('./src/muon.es6', { base: 'src' })
    // Inject version number first.
    .pipe(replace('{{VERSION}}', packageDef.version))
    // Transpile ES2015/6 -> ES5.
    .pipe(babel())
    .on('error', function(e) {
      // Print stack trace.
      console.log('Compilation Error: \n' + e.stack)
      // Skip to end.
      this.emit('end')
    })
    // Add Universal Module Definition. TODO: Get around this so we can enable sourcemaps.
    .pipe(umd())
    // Write out unminified dev version.
    .pipe(rename('muon-dev.js'))
    .pipe(gulp.dest('./dist'))
    // Minified for compactness.
    .pipe(uglify())
    // Rename the file to include the version number and such.
    .pipe(rename('muon-' + packageDef.version + '.min.js'))
    // Write out minified version.
    .pipe(gulp.dest('./dist'))
    // Reload test page (if applicable).
    .pipe(livereload())
    .on('end', done)
  } catch (e) {
    console.log(e.stack)
  }
})

gulp.task('reload-tests', function() {
  gulp.src('./test/test.html').pipe(livereload())
})

gulp.task('default', function() {
  livereload.listen({
    'basePath': './',
  })
  gulp.watch('./src/*', ['transpile', 'reload-tests'])
  gulp.watch('./test/*', ['reload-tests'])
})
