$(document).ready ->
	data_for_V = [
				{
					value: 300,
					color:"#FDB45C",
					highlight: "#FFC870",
					label: "大V"
				},
				{
					value: 50,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "普通人"
				}

			];
	data_for_gender = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "女"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "男"
				}

			];
	console.log $('#pie_for_V')
	ctx_V=document.getElementById("pie_for_V").getContext("2d");
	ctx_gender=document.getElementById("pie_for_gender").getContext("2d");
	window.pie_for_V = new Chart(ctx_V).Pie(data_for_V)
	window.pie_for_V = new Chart(ctx_gender).Pie(data_for_gender)
	