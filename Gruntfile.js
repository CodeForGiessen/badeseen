'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './sass',
            css: './public/css',
            js: ['*.js', 'public/js/*.js', 'test/*.js'],
            beautify: ['*.js', 'public/js/*.js', 'test/*.js', 'index.html', 'public/partials/**.html']
        },
        buildType: 'Build',
        pkg: grunt.file.readJSON('package.json'),
        archiveName: grunt.option('name') || 'badeseen',

        clean: {
            pre: ['dist/', 'build/'],
            post: ['<%= archiveName %>.zip']
        },

        compress: {
            main: {
                options: {
                    archive: '<%= archiveName %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['public/css/**'],
                    dest: 'build/'
                }, {
                    expand: true,
                    src: ['public/js/**'],
                    dest: 'build/'
                }, {
                    expand: true,
                    src: ['index.html'],
                    dest: 'build/'
                }]
            },
            archive: {
                files: [{
                    expand: true,
                    src: ['<%= archiveName %>.zip'],
                    dest: 'dist/'
                }]
            }
        },

        jshint: {
            src: '<%= paths.js %>',
            options: {
                jshintrc: '.jshintrc' // relative to Gruntfile
            }
        },

        jsbeautifier: {
            options: {
                html: {
                    braceStyle: 'collapse',
                    indentChar: ' ',
                    indentScripts: 'keep',
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
                    wrapLineLength: 0
                },
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            },
            beautify: {
                src: '<%= paths.beautify %>'
            },
            check: {
                src: '<%= paths.beautify %>',
                options: {
                    mode: 'VERIFY_ONLY'
                }
            }
        },

        sass: {
            admin: {
                files: {
                    '<%= paths.css %>/main.css': '<%= paths.scss %>/main.scss',
                }
            },
            fontawesome: {
                files: {
                    '<%= paths.css%>/vendor/font-awesome.css': '<%= paths.scss %>/vendor/font-awesome/font-awesome.scss'
                }
            }
        },

        watch: {
            sass: {
                files: './sass/**/*.scss',
                tasks: ['sass:admin']
            },
            js: {
                files: '<%= paths.js %>',
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['jshint', 'jsbeautifier:check', 'sass:admin']);
    grunt.registerTask('beautify', ['jsbeautifier:beautify']);
    grunt.registerTask('deploy', ['jsbeautifier:beautify', 'clean:pre', 'copy:main', 'compress', 'copy:archive', 'clean:post']);
};
