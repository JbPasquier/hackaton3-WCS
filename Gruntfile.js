'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var serveStatic = require('serve-static');


module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    hswf: {
      app: require('./bower.json').appPath || 'app/static',
      dist: 'app/static'
    },
    watch: {
      options: {
        livereload: 35729
      },
      src: {
        files: [
          '<%= hswf.app %>/*.html',
          '<%= hswf.app %>/css/**/*',
          '<%= hswf.app %>/js/**/*',
          '<%= hswf.app %>/views/**/*'
        ]
      }
    },
    connect: {
      proxies: [
        {
          context: '/hswf',
          host: 'localhost',
          port: 5000,
          https: false,
          changeOrigin: false
        }
      ],
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= hswf.app %>'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              serveStatic(require('path').resolve('app/static'))
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });
};
