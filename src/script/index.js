window.jQuery = window.$ = require("jquery/dist/jquery");
window.$.velocity = require('velocity-animate/velocity');
import Parallax from 'parallax-js/dist/parallax';
import 'velocity-animate/velocity.ui';

// setting
if (module.hot) {
    module.hot.accept()
}

//parallax
const scene = document.getElementById('scene');
if (scene) {
    new Parallax(scene);
}

(function ($) {

    // preloader
    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').velocity({
                opacity: 0.1,
                translateY: "-80px"
            }, {
                duration: 400,
                complete: function () {
                    $('.screen').velocity({
                        translateY: "-100%"
                    }, {
                        duration: 1000,
                        easing: [0.7, 0, 0.3, 1],
                        progress: function () {
                            $('.main').addClass('main-animation');
                        }
                    })
                }
            })
        }, 10)
    });

    // cursor
    var browserPrefix = '';
    var usrAg = navigator.userAgent;
    if (usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) {
        browserPrefix = "-webkit-";
    } else if (usrAg.indexOf("Opera") > -1) {
        browserPrefix = "-o";
    } else if (usrAg.indexOf("Firefox") > -1) {
        browserPrefix = "-moz-";
    } else if (usrAg.indexOf("MSIE") > -1) {
        browserPrefix = "-ms-";
    }

    var $cursor = jQuery('#js-cursor');
    var $cursorBig = jQuery('#js-cursor-big');
    var $links = jQuery('a, button');

    jQuery(window).on('mousemove', function (e) {
        $cursor.css(browserPrefix + 'transform', 'translate(' + e.pageX + 'px, ' + e.pageY + 'px)');
    });

    $links.on('mouseenter', function (e) {
        $cursorBig.css(browserPrefix + 'transform', 'scale(1)');
    });

    $links.on('mouseleave', function (e) {
        $cursorBig.css(browserPrefix + 'transform', 'scale(0)');
    });

})(jQuery);