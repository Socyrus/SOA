// Generated by CoffeeScript 1.9.3
(function() {
  $(document).ready(function() {
    window.idol = new Idol({
      div: $('.idol'),
      img: $('.idol-img'),
      menu: $('.idol-menu'),
      msg: $('.idol-msg'),
      height: 140,
      width: 140
    });
    $('.idol-img').click(function(event) {
      var idol;
      idol = window.idol;
      if (idol.is_menu_show) {
        idol.hide_menu(idol);
        return event.preventDefault();
      }
      idol.show_menu(idol, {
        code: "<p>What do you want me to <strong>do</strong> for you?</p> <a href='#'>go home</a>"
      });
      return event.preventDefault();
    });
    return idol.breath_start(idol, {
      breath_time: 5000
    });
  });

}).call(this);
