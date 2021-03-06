var amqp = require('amqp');

var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('./amqprpc'))(connection);


exports.make_request = function(queue_name, msg_payload, callback){
	console.log("Inside make_request client.js");
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		if(err)
			console.error(err);
		else{
			console.log("response:", response);
			callback(null, response);
		}
		connection.end();
	});
}
