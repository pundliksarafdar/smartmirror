express = require('express');
bodyParser = require('body-parser');
server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
routes = require("./api/routes/routes") ;
server = express(),
  
	
	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(bodyParser.json()); 
	
	server.use(express.static('pages'))
	
	routes(server);  
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

