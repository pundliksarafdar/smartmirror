'use strict';
module.exports = function(app) {
	let data = {"weather":false,"shares":false};
	app.route("/weather/:status").get((req, res)=>{
		data.weather = req.params.status;		
		res.end(getData());
	});
	
	app.route("/shares/:status").get((req, res)=>{
		data.shares = req.params.status;		
		res.end(getData());
	});
	
	app.route("/").get((req, res)=>{
		res.end(getData());
	});
	
	function getData(){
		return JSON.stringify(data);
	}
	
	
}