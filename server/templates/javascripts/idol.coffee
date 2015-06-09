class Idol
	constructor: (para) ->
		@path = para.path
		@div = para.div
		@img = para.img
		@msg = para.msg
		@menu = para.menu
		@height = para.height
		@width = para.width
		@is_breath = false;
		@is_menu_show = false;
		@is_msg_show = false;
		@cur_img = '0.jpg';
		
		@img.attr('src', 'idol/0.jpg')
		@img.attr('height', @height)
		@img.attr('width', @width)
		#@menu.css('right', @width)
		#@msg.css('left', @width)
	hide_msg: (idol, option) ->
		idol.msg.animate({
			'height': 0,
			'width': 0},
			'fast',
			->(
				idol.is_msg_show = false;
				idol.msg.hide()
				if (idol.msg_timeout)
					idol.msg_timeout = null;
				if (option and option.callback)
					callback = option.callback
					option.callback = null;
					callback(idol, option)
			)
		)
	show_msg: (idol, option) ->
		idol.msg.stop()
		idol.is_msg_show = true;
		idol.msg.show()
		idol.msg.css('height', '0')
		idol.msg.css('width', '0')
		idol.msg.html('')
		
		txt="<p>"+option.txt+"</p>"
		idol.msg.html(txt)
		idol.msg.css('height', 'auto')
		idol.msg.css('width', 'auto')
		if idol.msg.outerWidth()>220
			idol.msg.css('width', '220px')
			idol.msg.css('height', 'auto')
			
		idol.msg_height=idol.msg.outerHeight()
		idol.msg_width=idol.msg.outerWidth()
		
		idol.menu.css('height', 0)
		idol.menu.css('width', 0)
		lim=idol.height/6*5
		hlf=idol.msg_height/2
		if hlf>lim
			bo=0
		else
			bo=lim-hlf
		idol.msg.css('right', idol.width+23)
		idol.msg.css('bottom', bo)

		idol.msg.animate({
			'height': idol.msg_height,
			'width': idol.msg_width},
			'fast',
			->(
				idol.msg_timeout=setTimeout((
					->(idol.hide_msg(idol, {}))),
					3000)
			))
	post_msg: (idol, option) ->
		if idol.msg_timeout
			clearTimeout(idol.msg_timeout)
			idol.msg_timeout = null;
			
		if idol.is_msg_show
			idol.hide_msg(idol, {
				callback: idol.show_msg,
				txt: option.txt
			})			
			return
		idol.show_msg(idol, option)

	show_menu: (idol, option) ->

		idol.menu.stop()
		idol.is_menu_show = true;
		idol.menu.show()
		
		idol.menu.html(option.code)
		idol.menu.css('height', 'auto')
		idol.menu.css('width', 'auto')
		if idol.menu.outerWidth()>350
			idol.menu.css('width', '350px')
			idol.menu.css('height', 'auto')			
			
		idol.menu_height=idol.menu.outerHeight()
		idol.menu_width=idol.menu.outerWidth()
		
		idol.menu.html('')
		idol.menu.css('height', 0)
		idol.menu.css('width', 0)
		lim=idol.height/6*5
		hlf=idol.menu_height/2
		if hlf>lim
			bo=0
		else
			bo=lim-hlf
		idol.menu.css('right', idol.width+23)
		idol.menu.css('bottom', bo)
		idol.menu.animate({
			'height': idol.menu_height,
			'width': idol.menu_width},
			'fast',
			->(
				idol.menu.html(option.code)
			))
		
	hide_menu: (idol, option)->
		idol.menu.stop()
		idol.menu.animate({
			'height': 0,
			'width': 0},
			'fast',
			->(
				idol.menu.html('')
				idol.menu.hide()
				idol.is_menu_show = false;
				if option and option.callback
					callback = option.callback
					option.callback = null;
					callback(idol, callback)
			))
	change_img: (idol, option) ->
		if idol.img_timeout
			clearTimeout(idol.img_timeout)
			idol.img_timeout = null;
		save = idol.cur_img
		idol.cur_img = option.img
		idol.img.attr('src', 'idol/'+option.img)
		
		if option.reset
			time = option.reset
			option.reset = null;
			option.img_timeout = setTimeout((->(idol.change_img(idol, {img: save}))), time)
	breath_down: (idol, option) ->
		console.log 'down'
		idol.img.animate({
			'height': idol.height,
			'width': idol.width
			},
			3000,
			->(
				idol.breath_timeout = setTimeout((->(idol.breath_up(idol, option))), option.breath_time)
			)
		)
	breath_up: (idol, option) ->
		console.log 'up'
		idol.img.animate({
			'height': idol.height*1.04,
			'width': idol.width*1.04
			},
			3000,
			->(
				idol.breath_timeout = setTimeout((->(idol.breath_down(idol, option))), 1200)
			)
		)
		
	breath_stop: (idol) ->
		if idol.is_breath and idol.breath_timeout
			idol.img.stop()
			clearTimeout(idol.breath_timeout)
			idol.is_breath = false;
			idol.breath_timeout = null;
			
	breath_start: (idol, option) ->
		idol.breath_stop(idol)
		idol.is_breath = true;
		idol.breath_up(idol, option)
		