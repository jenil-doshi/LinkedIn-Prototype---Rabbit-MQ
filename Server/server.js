//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var user = require('./services/user');
var connection = require('./services/connection');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on loginQueue");

	cnn.queue('loginQueue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, headers));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			util.log("message id:"+ message.id);
			util.log("before if condition part");
					
			if(message.id === "1")
			{
				login.login_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.id === "2")
			{
				console.log("inside else if part");
					
				login.register_request(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.id === "3")
			{
				console.log("inside 3 part");
					
				login.logout_request(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.id === "4")
			{
				console.log("inside 4 part");
					
				login.search_request(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			});
		});

	cnn.queue('userQueue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, headers));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.uid === "1")
			{
				console.log("Inside if")
				user.after_login_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "2")
			{	console.log("Inside else if 2:")
				user.saveExperience_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "3")
			{
				console.log("Inside else if 3 ")
				user.saveSummary_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "4")
			{
				console.log("Inside else if 4 ")
				user.saveEducation_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "5")
			{
				console.log("Inside else if 5 ")
				user.saveSkills_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "6")
			{
				console.log("Inside else if 6 ")
				user.viewProfile_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "7")
			{
				console.log("Inside else if 7 ")
				user.image_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "8")
			{
				console.log("Inside else 8 ")
				user.editSummary_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "9")
			{
				console.log("Inside else 9 ")
				user.editExperience_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.uid === "10")
			{
				console.log("Inside else 10")
				user.editEducation_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else
			{
				console.log("Inside else ")
				user.editSkills_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			});
		});
		
	cnn.queue('connectionQueue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, headers));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
					
			if(message.cid === "1")
			{
				console.log("Inside else 1 ")
				connection.insert_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.cid === "2")
			{
				console.log("Inside else 2 ")
				connection.connect_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.cid === "3")
			{
				console.log("Inside else 3 ")
				connection.connectedUser_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			else if(message.cid === "4")
			{
				console.log("Inside else 4 ")
				connection.AcceptInvitation_request(message, function(err,res){

						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
			}
			});
		});
});