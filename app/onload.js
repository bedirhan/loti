$(function () {

	var options = {
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'treemap'
		},				
		series: [{
			type: "treemap",
			color: '#058DC7',
			layoutAlgorithm: 'squarified',
			data: LOTI.Payloads
		}],

		title: {
			text: 'Load of Inputs Aiming Your Application'
		},
		tooltip: {
			formatter: function () {
				return "<b>Type:</b> " + LOTI.HTMLEncode(this.point.summary) + "<br/>" + "<b>Payload:</b> " + LOTI.HTMLEncode(this.point.detail);
			}
		},					
		plotOptions: {
			treemap: {
				dataLabels: {
					formatter: function () {
						var name = LOTI.HTMLEncode(this.point.name);
						return name;
					}
				}
			}
		}					
	};
	
	var chart = new Highcharts.Chart(options);
	
	update();
	
	$("#regex").on('input', function() {
		update();
	});				

	$("#strategy").on('change', function() {
		update();
	});			
	
	function update()
	{
		var regex = $("#regex").val();
		
		if(!regex)
		{
			return;
		}
		
		var strategy = $("select option:selected").val();

		try
		{
			var re = new RegExp(regex);
			if(strategy == LOTI.InputControlStrategy.WHITELIST)
			{
				if(regex.indexOf("^") !== 0)
				{
					var re = new RegExp("^" + regex + "$");
				}
			}
		}
		catch(e)
		{
			return;
		}			
		LOTI.Apply(re, strategy);
		chart.series[0].update({
			data: LOTI.Payloads
		}, true);
		chart.redraw();	

		$('#score').text(LOTI.CalculateScore());
	}
	
	$('input[type=text][name=regex]').tooltip({
		placement: "bottom",
		trigger: "hover"
	});				
});				
