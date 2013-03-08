/*
 * jQuery gvChart plugin
 * This plugin was created to simplify things when using Google Visualisation Charts.
 * All examples you will find on http://www.ivellios.toron.pl/technikalia/demos/gvChart/
 * @name jquery.gvChart.min.js
 * @author Janusz Kamieński - http://www.ivellios.toron.pl/technikalia
 * @category jQuery plugin google charts
 * @copyright (c) 2010 Janusz Kamieński (www.ivellios.toron.pl)
 * @license CC Attribution Works 3.0 Poland - http://creativecommons.org/licenses/by/3.0/pl/deed.en_US
 * @example Visit http://www.ivellios.toron.pl/technikalia/demos/gvChart/ for more informations about this jQuery plugin
 * @June 2012 Added swapping of tables columns and rows by Glenn Wilton
 * @March 2013 Added asynchronous loading with callback by Jason Gill
 * Use googleLoaded.done(function(){ //charts here }); for deferred usage.
 */
 var googleLoaded = $.Deferred();
 (function ($){
 	$.getScript("http://www.google.com/jsapi", function() {
 		var gvChartCount = 0;
 		google.load('visualization', '1', {packages: ['corechart'],callback:function(){window.googleLoaded.resolve()}});
 		$.fn.gvChart = function(settings){
 			var $this = $(this),
	 			defaults={
	 				hideTable: true,
	 				chartType: 'AreaChart',
	 				chartDivID: 'gvChartDiv',
	 				gvSettings: null,
	 				swap: false
	 			},
	 			el = $('<div>'),
	 			gvChartID = defaults.chartDivID+gvChartCount++,
	 			data,
	 			headers,
	 			rows;

 			el.attr('id',gvChartID);
 			el.addClass('gvChart');
 			el.attr('aria-hidden','true');

 			$this.before(el);

 			$.extend(defaults,settings);

 			if(defaults.hideTable){
 				$this.hide();
 				$this.attr('aria-hidden','false');
 			}

 			data = new google.visualization.DataTable();

			// add X label
			data.addColumn('string','X labels');


			var headers = $this.find('thead th');
			var rows = $this.find('tbody tr');

			if(defaults.swap){
				headers.each(function(index){
					if(index){
						data.addColumn('number',$(this).text());
					}
				});
				data.addRows(rows.length);

				rows.each(function(index){
					data.setCell(index, 0, $(this).find('th').text());	   
				});

				rows.each(function(index){
					$(this).find('td').each(function(index2){
						data.setCell(index, index2+1 , parseFloat($(this).text(),10) );
					});
				});		
				
			} else {
				// Add Columns
				rows.each(function(index){
					data.addColumn('number',$(this).find('th').text());
				});

				// Create data size
				data.addRows(headers.length-1);

				// Set the TITLE of each row
				headers.each(function(index){
					if(index){
						data.setCell(index-1, 0, $(this).text());
					}
				});

				// Populate with data
				rows.each(function(index){
					$(this).find('td').each(function(index2){
						data.setCell(index2, index+1, parseFloat($(this).text(),10) );
					});
				});
			}
			
			defaults.gvSettings.title = $(this).find('caption').text();
			
			var chart = new google.visualization[defaults.chartType](document.getElementById(gvChartID));
			chart.draw(data, defaults.gvSettings);
		}
	});
})(jQuery);

