module.exports = function(grunt){

require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cachebuster: {
            build: {
                options: {
                    banner: '<%= meta.custom_banner %>',
                    format: 'json',
                    basedir: 'src/assets/'
                },
                src: [ 'src/assets/filename1', 'src/assets/folder1/filename2' ],
                dest: 'target/cachebusters.json'
            }
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/master.css': 'build/css/master.css'
                }
            }
        },
        cssmin: {
            build: {
                src: 'build/css/master.css',
                dest: 'build/css/master.min.css'
            }
        },
        sass: {
            build: {
                files: {
                    'build/css/master.css': 'assets/sass/master.scss'
                }
            }
        },
        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['buildcss'],
            },
            options: {
                livereload: true,
            }
        }
    });


grunt.registerTask('default', []);
grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
grunt.registerTask('grunt-cachebuster', ['cachebuster']);


};
