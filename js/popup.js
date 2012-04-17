(function($) {
  var popup_class = "popup";

  function Popup(options, origin_el) {
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
    // this.middle_top = scroll_top;
    this.middle_left = Math.abs(this.end_left - this.begin_left) / 2;
    this.middle_duration = 225;

    this.popup_el = origin_el.clone().addClass(popup_class);

    this.begin_opacity = 1;
    this.end_opacity = 1;
    this.middle_opacity = 1;
    // this.middle_opacity = (this.end_opacity - this.begin_opacity) / 2;
    this.MSPF = 25;
  }

  Popup.prototype = {
    initialize: function() {
      this.popup_el.css({
        'left': this.begin_left,
        'top': this.begin_top,
        'width': this.begin_width,
        'height': this.begin_height,
        'opacity': this.begin_opacity
      });
      this.origin_el.after(this.popup_el);
    },

    animate: function() {
      var popup = this;

      popup.popup_el.animate({
        'top': popup.middle_top,
        'left': popup.middle_left,
        'height': popup.middle_height,
        'width': popup.middle_width,
        'flip': true,
        'opacity': popup.middle_opacity
      }, popup.middle_duration, 'ellipse', function() {
        $(popup.popup_el).animate({
          'top': popup.end_top,
          'left': popup.end_left,
          'height': popup.end_height,
          'width': popup.end_width,
          'flip': true,
          'opacity': popup.end_opacity
        }, popup.end_duration, 'ellipse');
      });
    }
  };

  $.fn.popup = function(options) {
    var defaults = {};
    var settings = $.extend({}, defaults, options);
    $('.' + popup_class).remove();
    var $el = $(this);

    var popup = new Popup(settings, $el);

    setTimeout(function() {
      popup.initialize();
      popup.animate();
    }, popup.begin_duration);

    return this;
  };
})($);
