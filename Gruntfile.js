module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/plugins/jquery.min.js',
                    'js/plugins/underscore.min.js',
                    'js/plugins/exif/load-image.min.js',
                    'js/plugins/exif/load-image-ios.js',
                    'js/plugins/exif/load-image-orientation.js',
                    'js/plugins/exif/load-image-meta.js',
                    'js/plugins/exif/load-image-exif.js',
                    'js/plugins/exif/load-image-exif-map.js',
                    'js/plugins/foundation/foundation.js',
                    'js/plugins/foundation/foundation.topbar.js',
                    'js/plugins/foundation/foundation.abide.js',
                    'js/plugins/gallery/*.js',
                    'js/plugins/jquery-ui-custom/*.js',
                    'js/plugins/md5/*.js',
                    'js/plugins/table/*.js',
                    'js/plugins/transit/*.js',
                    'js/plugins/waypoint/*.js',
                ],
                dest: 'js/plugins/build/production.plugins.js'
            }
        },
        uglify: {
            build: {
                src: 'js/plugins/build/production.plugins.js',
                dest: 'js/plugins/build/production.plugins.min.js'
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
                    'css/pages/search.css': 'css/pages/search.scss',
                    'css/pages/galleryview.css': 'css/pages/galleryview.scss',
                    'css/pages/verify.css': 'css/pages/verify.scss',
                    'css/pages/tou.css': 'css/pages/tou.scss',
                    'css/pages/howto.css': 'css/pages/howto.scss',
                    'css/pages/admin.css': 'css/pages/admin.scss'
                }
            } 
        },
        concat_css: {
            options:{
                rebaseUrls: false
            },
            all: {
                src: [
                    'css/plugins/normalize.css',
                    'css/plugins/foundation.css',
                    'css/plugins/custom-jqui-theme/jquery-ui-1.10.4.custom.css',
                    'css/plugins/fontello/*.css',
                    'css/plugins/gallery/jquery.justifiedgallery.min.css',
                ],
                dest: 'css/plugins/build/production.plugins.css'
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
                cwd: 'css/plugins/build/',
                src: ['production.plugins.css', '!*.min.css'],
                dest: 'css/plugins/build/',
                ext: '.plugins.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['^(?!build$).*/*.{png,jpg,gif}'],
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
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'concat_css', 'autoprefixer', 'cssmin', 'imagemin']);
};