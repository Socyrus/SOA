$(document).ready ->
	window.idol = new Idol({
			div : $('.idol'), 
			img : $('.idol-img'),
			menu : $('.idol-menu'),
			msg : $('.idol-msg'),
			height : 140,
			width : 140})
	$('.idol-img').click (event)->
		idol=window.idol
		if idol.is_menu_show
			idol.hide_menu(idol)
			return event.preventDefault()
		idol.show_menu(idol, {code: "
			<p>What do you want me to <strong>do</strong> for you?</p>
			<a href='#'>go home</a>
		"})
		return event.preventDefault()
		#idol.show_menu('this is menu')
	idol.breath_start(idol, {breath_time: 5000})