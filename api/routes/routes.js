'use strict';
module.exports = function(app) {
	let data = {"weather":false,"news":false};
	app.route("/weather/:status").get((req, res)=>{
		data.weather = parseBool(req.params.status);		
		res.end(getData());
	});
	 
	app.route("/news/:status").get((req, res)=>{
		data.news = parseBool(req.params.status);		
		res.end(getData());
	});
	
	app.route("/status").get((req, res)=>{
		res.end(getData());
	});
	
	function getData(){
		return JSON.stringify(data);
	}
	 
	function parseBool(val){
		return val===true || val === "true";
	}
}