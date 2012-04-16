(function($) {
  function Popup(options, origin_el) {
    var scroll_left = $(window).scrollLeft();
    var scroll_top = $(window).scrollTop();

    this.origin_el = origin_el;

    this.begin_left = origin_el.position().left;
    this.begin_top = origin_el.position().top;
    this.begin_width = origin_el.width();
    this.begin_height = origin_el.height();

    this.end_width = options.width ? this.begin_width : options.width;
    this.end_height = options.height ? this.begin_height : options.height;
    this.end_top = 100 + scroll_top;
    this.end_left = 50 + scroll_left;

    this.middle_top = scroll_top - this.end_height / 2;
    this.middle_left = (this.end_left - this.begin_left) / 2;

    this.popup_el = origin_el.clone().addClass('popup');

    this.begin_opacity = 0;
    this.end_opacity = 1;

    this.MSPF = 25;
  }

  Popup.prototype = {
    initialize: function() {
      this.popup_el.css({
        'left': this.begin_left,
        'top': this.begin_top,
        'width': this.end_width,
        'height': this.end_height,
        'opacity': this.begin_opacity
      });
    },

    animateToTop: function() {
      this.popup_el.css({

      });
    },

    animate: function() {
      var popup = this;

      setTimeout(function() {
        popup.initialize();
        popup.animation_to_top = setInterval(popup.animateToTop, popup.MSPF);
      }, 10 * this.MSPF);

      this.popup_el.animate({
        'top': '-=' + (this.begin_top + this.end_height / 2),
        'left': '-=50',
        'opacity': (this.end_opacity - this.begin_opacity) / 2
      }, {
        duration: 225,
        easing: 'linear'
      }).animate({
          'top': this.end_top,
          'left': this.end_left,
          'opacity': this.end_opacity
        }, {
          duration: 225,
          easing: 'linear'
        });

      this.origin_el.after(this.popup_el);
    }
  };

  $.fn.popup = function(options) {
    var defaults = {};
    var settings = $({}, defaults, options);

    this.each(function() {

      var $el = $(this);

      var popup = new Popup(settings, $el);

      setTimeout(function() {
        popup.initialize();
        popup.animate();
      }, 250);
    });

    return this;
  };
})($);