// Generated by CoffeeScript 1.9.3
  var Idol;

  Idol = (function() {
    function Idol(para) {
      this.path = para.path;
      this.div = para.div;
      this.img = para.img;
      this.msg = para.msg;
      this.menu = para.menu;
      this.height = para.height;
      this.width = para.width;
      this.is_breath = false;
      this.is_menu_show = false;
      this.is_msg_show = false;
      this.cur_img = '0.jpg';
      this.img.attr('src', 'idol/0.jpg');
      this.img.attr('height', this.height);
      this.img.attr('width', this.width);
    }

    Idol.prototype.hide_msg = function(idol, option) {
      return idol.msg.animate({
        'height': 0,
        'width': 0
      }, 'fast', function() {
        var callback;
        idol.is_msg_show = false;
        idol.msg.hide();
        if (idol.msg_timeout) {
          idol.msg_timeout = null;
        }
        if (option && option.callback) {
          callback = option.callback;
          option.callback = null;
          return callback(idol, option);
        }
      });
    };

    Idol.prototype.show_msg = function(idol, option) {
      var bo, hlf, lim, txt;
      idol.msg.stop();
      idol.is_msg_show = true;
      idol.msg.show();
      idol.msg.css('height', '0');
      idol.msg.css('width', '0');
      idol.msg.html('');
      txt = "<p>" + option.txt + "</p>";
      idol.msg.html(txt);
      idol.msg.css('height', 'auto');
      idol.msg.css('width', 'auto');
      if (idol.msg.outerWidth() > 220) {
        idol.msg.css('width', '220px');
        idol.msg.css('height', 'auto');
      }
      idol.msg_height = idol.msg.outerHeight();
      idol.msg_width = idol.msg.outerWidth();
      idol.menu.css('height', 0);
      idol.menu.css('width', 0);
      lim = idol.height / 6 * 5;
      hlf = idol.msg_height / 2;
      if (hlf > lim) {
        bo = 0;
      } else {
        bo = lim - hlf;
      }
      idol.msg.css('right', idol.width + 23);
      idol.msg.css('bottom', bo);
      return idol.msg.animate({
        'height': idol.msg_height,
        'width': idol.msg_width
      }, 'fast', function() {
        return idol.msg_timeout = setTimeout((function() {
          return idol.hide_msg(idol, {});
        }), 3000);
      });
    };

    Idol.prototype.post_msg = function(idol, option) {
      if (idol.msg_timeout) {
        clearTimeout(idol.msg_timeout);
        idol.msg_timeout = null;
      }
      if (idol.is_msg_show) {
        idol.hide_msg(idol, {
          callback: idol.show_msg,
          txt: option.txt
        });
        return;
      }
      return idol.show_msg(idol, option);
    };

    Idol.prototype.show_menu = function(idol, option) {
      var bo, hlf, lim;
      idol.menu.stop();
      idol.is_menu_show = true;
      idol.menu.show();
      idol.menu.html(option.code);
      idol.menu.css('height', 'auto');
      idol.menu.css('width', 'auto');
      if (idol.menu.outerWidth() > 350) {
        idol.menu.css('width', '350px');
        idol.menu.css('height', 'auto');
      }
      idol.menu_height = idol.menu.outerHeight();
      idol.menu_width = idol.menu.outerWidth();
      idol.menu.html('');
      idol.menu.css('height', 0);
      idol.menu.css('width', 0);
      lim = idol.height / 6 * 5;
      hlf = idol.menu_height / 2;
      if (hlf > lim) {
        bo = 0;
      } else {
        bo = lim - hlf;
      }
      idol.menu.css('right', idol.width + 23);
      idol.menu.css('bottom', bo);
      return idol.menu.animate({
        'height': idol.menu_height,
        'width': idol.menu_width
      }, 'fast', function() {
        return idol.menu.html(option.code);
      });
    };

    Idol.prototype.hide_menu = function(idol, option) {
      idol.menu.stop();
      return idol.menu.animate({
        'height': 0,
        'width': 0
      }, 'fast', function() {
        var callback;
        idol.menu.html('');
        idol.menu.hide();
        idol.is_menu_show = false;
        if (option && option.callback) {
          callback = option.callback;
          option.callback = null;
          return callback(idol, callback);
        }
      });
    };

    Idol.prototype.change_img = function(idol, option) {
      var save, time;
      if (idol.img_timeout) {
        clearTimeout(idol.img_timeout);
        idol.img_timeout = null;
      }
      save = idol.cur_img;
      idol.cur_img = option.img;
      idol.img.attr('src', 'idol/' + option.img);
      if (option.reset) {
        time = option.reset;
        option.reset = null;
        return option.img_timeout = setTimeout((function() {
          return idol.change_img(idol, {
            img: save
          });
        }), time);
      }
    };

    Idol.prototype.breath_down = function(idol, option) {
      console.log('down');
      return idol.img.animate({
        'height': idol.height,
        'width': idol.width
      }, 3000, function() {
        return idol.breath_timeout = setTimeout((function() {
          return idol.breath_up(idol, option);
        }), option.breath_time);
      });
    };

    Idol.prototype.breath_up = function(idol, option) {
      console.log('up');
      return idol.img.animate({
        'height': idol.height * 1.04,
        'width': idol.width * 1.04
      }, 3000, function() {
        return idol.breath_timeout = setTimeout((function() {
          return idol.breath_down(idol, option);
        }), 1200);
      });
    };

    Idol.prototype.breath_stop = function(idol) {
      if (idol.is_breath && idol.breath_timeout) {
        idol.img.stop();
        clearTimeout(idol.breath_timeout);
    
    idol.is_breath = false;
        return idol.breath_timeout = null;
      }
    };

    Idol.prototype.breath_start = function(idol, option) {
      idol.breath_stop(idol);
      idol.is_breath = true;
      return idol.breath_up(idol, option);
    };

    return Idol;

  })();

