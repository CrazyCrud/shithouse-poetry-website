module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/plugins/*.js',
                    'js/pages/*.js',
                    'js/global.js'
                ],
                dest: 'js/build/production.js'
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        sass: {
            dist: {
                /*
                options: {
                    style: 'compressed'
                },
                */
                files: {
                    /* ['css/global.scss', 'css/pages/home.scss'] */
                    'css/global.css': 'css/*.scss',
                    'css/overlay.css': 'css/overlay.scss',
                    'css/pages/home.css': 'css/pages/home.scss',
                    'css/pages/details.css': 'css/pages/details.scss',
                    'css/pages/upload.css': 'css/pages/upload.scss',
                    'css/pages/register.css': 'css/pages/register.scss',
                    'css/pages/user.css': 'css/pages/user.scss',
                    'css/pages/timeline.css': 'css/pages/timeline.scss',
                    'css/pages/search.css': 'css/pages/search.scss'
                }
            } 
        },
        uncss: {
            dist: {
                files: {
                'css/global.css': ['index.html','pages/*.html']
                }
            }
        },
        concat_css: {
            options:{
                rebaseUrls: false
            },
            all: {
                src: [
                    'css/global.css',
                    'css/pages/*.css'
                ],
                dest: 'css/global.css'
            },
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    'css/build/production.css': 'css/build/global.css'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/build/',
                src: ['production.css', '!*.min.css'],
                dest: 'css/build/',
                ext: '.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/build/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/plugins/*.js', 'js/pages/*.js', 'js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/modules/*.scss', 'css/partials/*.scss', 'css/pages/*.scss', 'css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    /*grunt.loadNpmTasks('grunt-contrib-sass');*/
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'concat_css', 'autoprefixer', 'cssmin', 'imagemin']);
};