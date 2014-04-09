/*
    Name: Lost Leaf Studio Main JS
    Description: Main JS scripts for LostLeafStudio.com
    Author: Josh Gerdes
    Author URI: http://joshgerdes.com
*/
jQuery(function ($) {

    // Check if namespace is defined
    if (typeof (LostLeafStudio) === 'undefined') {
        LostLeafStudio = {};
    }

    // Define the application namespace
    LostLeafStudio = (function ($) {
        var _data = null;
        var _imgPath = 'img/work/';

        var _init = function () {
            // Load project work details
            _loadWork();

            // Setup mail link
            $('.flip-mail').click(function(e) {
                $(this).attr('href', 'mailto:' + $(this).data('mail').split('').reverse().join(''));
                return true;
            });

            // Add smooth scrolling to all internal hash links
            $('a[href*=#]:not(.modal)').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html:not(:animated),body:not(:animated)').animate({scrollTop: targetOffset}, 'slow');
                        return false;
                    }
                }
            });
        };
        
        var _loadWork = function() {
            $.getJSON('data.json', function(data) {
                var _data = data;

                $.each(_data, function(key, val) {
                    // Setup flip card for work project
                    var title = $('<h3>').html(val.title);
                    var link = $('<a>', { 'href' : '#', 'class' : 'btn modal-link', 'data-id' : val.id}).html('Details');
                    var details = $('<div>', { 'class' : 'card-detail'}).append(title).append(link);
                    if(val.url.length)  $('<a>', { 'href' : val.url, 'class' : 'btn site-link', 'target' : '_blank'}).html('Visit Site').appendTo(details);
                    var thumb = $('<img>', { 'src' : _imgPath + val.thumbnail, 'alt' : '' });
                    var container = $('<div>', { 'class' : 'card scroll'});
                    $('<div>', { 'class' : 'card-wrapper'}).appendTo(container).append(thumb).append(details);

                    container.appendTo('#work .row');
                });

                // Setup 3d flip, if available
                if ($('html').hasClass('csstransforms3d')) {        
                    $('.card').removeClass('scroll').addClass('flip');     
                    $('.card.flip').hover(
                        function () {
                        $(this).find('.card-wrapper').addClass('flipIt');
                        },
                        function () {
                            $(this).find('.card-wrapper').removeClass('flipIt');           
                        }
                    );          
                } else {
                    $('.card-detail').each(function() {
                        $(this).css('height', $(this).height() - ($(this).outerHeight() - $(this).height()));
                        $(this).css('width', $(this).width() - ($(this).outerWidth() - $(this).width()));
                    });

                    $('.card').hover(
                        function () {
                            $(this).find('.card-detail').stop().animate({bottom:0}, 500, 'easeOutCubic');
                        },
                        function () {
                            $(this).find('.card-detail').stop().animate({bottom: ($(this).outerHeight() * -1) }, 500, 'easeOutCubic');          
                        }
                    );
                }

                // Setup modals
                $('.modal-link').on('click', function (e) {
                    // Load project details for given id
                    var obj = _getObjects(_data, 'id', $(this).data('id'));
                    var screenshot = _imgPath + obj[0].screenshot;
                    $('.modal-container .screenshot').attr('src', screenshot).parent('a').attr('href', screenshot);
                    $('.modal-container .title').html(obj[0].title);
                    $('.modal-container .description').html(obj[0].description);
                    
                    var list = $('.modal-container .involvement');
                    list.empty();
                    $.each(obj[0].involvement, function(key, val) {
                        $('<li>').html(val).appendTo(list);
                    });

                    var list_tech = $('.modal-container .technologies');
                    list_tech.empty();
                    $.each(obj[0].technologies, function(key, val) {
                        $('<li>').html(val).appendTo(list_tech);
                    });

                    // Setup modal and show
                    $('.modal-container').reveal({});

                    return false;
                });
            });         
        };

        var _getObjects = function(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(_getObjects(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
        };

        return {
            init: function () {
                _init();
            }
        }
        
    })(jQuery);

    // Initialize the application namespace
    LostLeafStudio.init();
});