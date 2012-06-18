/*
 * jQuery gvChart plugin
 * This plugin was created to simplify things when using Google Visualisation Charts. 
 * It still needs to be used with google script import tag, however now you can
 * crate chart from your table. 
 * All examples you will find on http://www.ivellios.toron.pl/technikalia/demos/gvChart/
 * @name jquery.gvChart-1.0.1.min.js
 * @author Janusz Kamieński - http://www.ivellios.toron.pl/technikalia
 * @version 1.1
 * @date December 04, 2010
 * @category jQuery plugin google charts
 * @copyright (c) 2010 Janusz Kamieński (www.ivellios.toron.pl)
 * @license CC Attribution Works 3.0 Poland - http://creativecommons.org/licenses/by/3.0/pl/deed.en_US
 * @example Visit http://www.ivellios.toron.pl/technikalia/demos/gvChart/ for more informations about this jQuery plugin
 * @June 2012 Added swapping of tables columns and rows by Glenn Wilton
 */
function gvChartInit(){gvChartCount=0;google.load("visualization","1",{packages:["corechart"]})}(function(jQuery){jQuery.fn.gvChart=function(settings){defaults={hideTable:true,chartType:"AreaChart",chartDivID:"gvChartDiv",gvSettings:null,swap:false};var el=document.createElement("div");jQuery(el).insertBefore(this);gvChartCount++;gvChartID=defaults.chartDivID+gvChartCount;jQuery(el).attr("id",gvChartID);jQuery(el).addClass("gvChart");if(settings){jQuery.extend(defaults,settings)}if(defaults.hideTable)$(this).hide();var data=new google.visualization.DataTable;data.addColumn("string","X labels");var a=new Array;var headers=$(this).find("thead").find("th");var rows=$(this).find("tbody").find("tr");if(defaults.swap){headers.each(function(a){if(a){data.addColumn("number",$(this).text())}});data.addRows(rows.length);rows.each(function(a){data.setCell(a,0,$(this).find("th").text())});rows.each(function(a){$(this).find("td").each(function(b){data.setCell(a,b+1,parseFloat($(this).text()))})})}else{rows.each(function(a){data.addColumn("number",$(this).find("th").text())});data.addRows(headers.length-1);headers.each(function(a){if(a){data.setCell(a-1,0,$(this).text())}});rows.each(function(a){$(this).find("td").each(function(b){data.setCell(b,a+1,parseFloat($(this).text()))})})}chartSettings={title:$(this).find("caption").text()};if(defaults.gvSettings){jQuery.extend(chartSettings,defaults.gvSettings)}eval("var chart = new google.visualization."+defaults.chartType+"(document.getElementById('"+gvChartID+"'))");chart.draw(data,chartSettings)}})(jQuery)