'use strict'

const gulp = require('gulp')
const sigServer = require('./sig-server/src')

let sigS

gulp.task('test:node:before', boot)
gulp.task('test:node:after', stop)
gulp.task('test:browser:before', boot)
gulp.task('test:browser:after', stop)
gulp.task("wait", () => {})

function boot(done) {
  const options = {
    port: 15555,
    host: '127.0.0.1',
    cryptoChallenge: false,
    strictMultiaddr: false
  }

  sigServer.start(options, (err, server) => {
    if (err) {
      throw err
    }
    sigS = server
    console.log('signalling on:', server.info.uri)
    done()
  })
}

function stop(done) {
  sigS.stop(done)
}

require('aegir/gulp')(gulp)
