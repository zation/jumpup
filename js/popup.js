(function($) {
  var jumpup_class = "jumpup";

  function Jumpup(options, origin_el) {
    var scroll_left = $(window).scrollLeft();
    var scroll_top = $(window).scrollTop();

    this.origin_el = origin_el;

    this.begin_left = origin_el.position().left;
    this.begin_top = origin_el.position().top;
    this.begin_width = origin_el.width();
    this.begin_height = origin_el.height();
    this.begin_duration = 250;

    this.end_width = options.width ? options.width : this.begin_width;
    this.end_height = options.height ? options.height : this.begin_height;
    this.end_top = 100 + scroll_top;
    this.end_left = 50 + scroll_left;
    this.end_duration = 225;

    this.middle_width = (this.end_width - this.begin_width) / 2 + this.begin_width;
    this.middle_height = (this.end_height - this.begin_height) / 2 + this.begin_height;
    this.middle_top = scroll_top - this.end_height / 2;
    this.middle_left = Math.abs(this.end_left - this.begin_left) / 2;
    this.middle_duration = 225;

    this.jumpup_el = origin_el.clone().addClass(jumpup_class);

    this.begin_opacity = 1;
    this.end_opacity = 1;
    this.middle_opacity = 1;
    this.MSPF = 25;
  }

  Jumpup.prototype = {
    initialize: function() {
      this.jumpup_el.css({
        'left': this.begin_left,
        'top': this.begin_top,
        'width': this.begin_width,
        'height': this.begin_height,
        'opacity': this.begin_opacity
      });
      this.origin_el.after(this.jumpup_el);
    },

    animate: function() {
      var jumpup = this;

      jumpup.jumpup_el.animate({
        'top': jumpup.middle_top,
        'left': jumpup.middle_left,
        'height': jumpup.middle_height,
        'width': jumpup.middle_width,
        'flip': true,
        'opacity': jumpup.middle_opacity
      }, jumpup.middle_duration, 'ellipse', function() {
        $(jumpup.jumpup_el).animate({
          'top': jumpup.end_top,
          'left': jumpup.end_left,
          'height': jumpup.end_height,
          'width': jumpup.end_width,
          'flip': true,
          'opacity': jumpup.end_opacity
        }, jumpup.end_duration, 'ellipse');
      });
    }
  };

  $.fn.jumpup = function(options) {
    var defaults = {};
    var settings = $.extend({}, defaults, options);
    $('.' + jumpup_class).remove();
    var $el = $(this);

    var jumpup = new Jumpup(settings, $el);

    setTimeout(function() {
      jumpup.initialize();
      jumpup.animate();
    }, jumpup.begin_duration);

    return this;
  };
})($);
