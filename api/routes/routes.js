'use strict';
module.exports = function(app) {
	let data = {"weather":false,"news":false,"gpio":false,"date":false};
	
	function resetData(){
		data.placementDepartment = false;
		data.examCell = false;
		data.directorOffice = false;
		data.fifthBlock = false;
		data.serverRoom = false;
		data.auditorium = false;
		data.canteen = false;
		data.officeTimming = false;
		data.readingHall = false;
		data.bookIssue = false;
		data.vPrint = false;
	}



	app.route("/weather/:status").get((req, res)=>{
		data.weather = parseBool(req.params.status);		
		res.end(getData());
	});

	app.route("/reset").get((req, res)=>{
		resetData();
		res.end(getData());
	});
	 
	app.route("/news/:status").get((req, res)=>{
		data.news = parseBool(req.params.status);		
		res.end(getData());
	});
	
	app.route("/gpio/:status").get((req, res)=>{
		data.gpio = parseBool(req.params.status);		
		res.end(getData());
	});
	
	app.route("/date/:status").get((req, res)=>{
		data.date = parseBool(req.params.status);		
		res.end(getData());
	});

	app.route("/status").get((req, res)=>{
		res.end(getData());
	});

	app.route("/readingHall").get((req, res)=>{
		resetData();
		data.readingHall = true;
		res.end(getData());
	});

	app.route("/bookIssue").get((req, res)=>{
		resetData();
		data.bookIssue = true;
		res.end(getData());
	});

	app.route("/vPrint").get((req, res)=>{
		resetData();
		data.vPrint = true;
		res.end(getData());
	});
	app.route("/placementDepartment").get((req, res)=>{
		resetData();
		data.placementDepartment = true;
		res.end(getData());
	});
	
	app.route("/examCell").get((req, res)=>{
		resetData();
		data.examCell = true;
		res.end(getData());
	});

	app.route("/directorOffice").get((req, res)=>{
		resetData();
		data.directorOffice = true;
		res.end(getData());
	});

	app.route("/fifthBlock").get((req, res)=>{
		resetData();
		data.fifthBlock = true;
		res.end(getData());
	});

	app.route("/serverRoom").get((req, res)=>{
		resetData();
		data.serverRoom = true;
		res.end(getData());
	});

	app.route("/auditorium").get((req, res)=>{
		resetData();
		data.auditorium = true;
		res.end(getData());
	});

	app.route("/canteen").get((req, res)=>{
		resetData();
		data.canteen = true;
		res.end(getData());
	});

	app.route("/officeTimming").get((req, res)=>{
		resetData();
		data.officeTimming = true;
		res.end(getData());
	});
	function getData(){
		return JSON.stringify(data);
	}
	 
	function parseBool(val){
		return val===true || val === "true";
	}
}