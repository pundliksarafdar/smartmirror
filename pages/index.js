var chartG = undefined;
var NEWAPI_KEY = "c0931a52d18146d5a693273877eea231";

$(document).ready(function(){
	initChart();
	setInterval(getStatus,3000)
});

function getStatus(){
	$.ajax({
		url:"/status",
		success:function(data){
			data = JSON.parse(data);
			data.weather == true?temperatureStatus():hideTemperature();
			data.news == true?showNews():hideNews();
		}
	});
}

function hideTemperature(){
	$("#weatherDiv").hide();
}

function hideNews(){
	$("#newsDiv").hide();
}

function showNews(){
	$("#newsDiv").show();
	$.ajax({
		url:"https://newsapi.org/v2/top-headlines?country=in&apiKey=c0931a52d18146d5a693273877eea231",
		success:function(data){
				$("#news-feed").empty();
				loadNews(data);
		}
	});
}

function loadNews(news){
	$.each(news.articles,function(idx,newsD){
		var $newsTmpl = $("#news-feed-tmpl").clone();
		$newsTmpl.css({"display":"block"});
		$newsTmpl.find("#headline").text(newsD.title);
		$newsTmpl.find("#summary").text(newsD.description);
		$newsTmpl.find("#detail").text(newsD.content);
		$("#news-feed").append($newsTmpl);
	})
}

function temperatureStatus(){
	$("#weatherDiv").show();
	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=b98cb278e2c7ad14e17df89e7715b89a",
		success:function(data){
			$("#weather-temp-min").html(data.main.temp_min-273.15);
			$("#weather-temp-max").html(data.main.temp_max-273.15);
			chartG.update({series:{data:[data.main.temp-273.15]}});			
		}
	});
}

function initChart(){
	chartG = Highcharts.chart('weather-temp', {
    chart: {
		height:'250px',
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: ''
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
		min:-25,
		max:50,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Celcius'
        },
		plotBands: [
		{
            from: -25,
            to: 8,
            color: '#DF5353' // red
        },{
            from: 8,
            to: 18,
            color: '#DDDF0D' // yellow
        }, {
            from: 18,
            to: 24,
            color: '#55BF3B' // green
        },{
            from: 24,
            to: 35,
            color: '#DDDF0D' // yellow
        },{
            from: 35,
            to: 50,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [0],
        tooltip: {
            valueSuffix: ' &#2103;'
        }
    }]

});
}