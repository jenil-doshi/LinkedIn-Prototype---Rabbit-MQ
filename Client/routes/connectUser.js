var ejs = require("ejs");
var express = require('express');
var mq_client = require('../rpc/client');

exports.insertPendingConnection = function(req,res){

	var to_userid = req.param("userid");
	var from_userid = req.session.userid;

	var msg_payload = { "to_userid": to_userid, "from_userid": from_userid, "cid": "1" };
		
		mq_client.make_request('connectionQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					res.render('connectUser', function(err, result){
						if(!err){
							res.send({"connectUser":"Success"});
						}
						else{
							 res.end('An error occurred');
				             console.log(err);
						}
					});
				}
				else {   
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
}


exports.connect = function(req,res){
	if(!req.session.userid)
	{
		res.render('index', { title: 'LinkedIn' });
		res.end();
	}
	var userid = req.session.userid;

	var msg_payload = { "userid": userid, "cid": "2" };
		
		mq_client.make_request('connectionQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					
					var useridArray = results.userid;
					var firstnameArray = results.firstname;
					var lastnameArray = results.lastname;
					var emailidArray = results.emailid;

					res.render('connect', {userid: useridArray, firstname: firstnameArray, lastname: lastnameArray, emailid: emailidArray}, function(err, result){
						if(!err){
							res.end(result);
						}
						else{
							 res.end('An error occurred');
				             console.log(err);
						}
					});
				}
				else {    
					
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
}


exports.invitation = function(req, res){
	if(!req.session.userid)
	{
		res.render('index', { title: 'LinkedIn' });
		res.end();
	}
var userid = req.session.userid;
var name = req.session.firstname;
var msg_payload = { "name": name, "userid": userid, "cid": "3" };
		
		mq_client.make_request('connectionQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					
					var useridArray = results.userid;
					var firstnameArray = results.firstname;
					var lastnameArray = results.lastname;
					var emailidArray = results.emailid;

					res.render('connectedUser', {userid: useridArray, firstname: firstnameArray, lastname: lastnameArray, emailid: emailidArray}, function(err, result){
						if(!err){
							res.end(result);
							
						}
						else{
							 res.end('An error occurred');
				             console.log(err);
						}
					});
				}
				else {    
					var firstnameArray = results.firstname;
					var name = results.name;
					res.render('connectionError',{firstname: firstnameArray, name: name},function(err,result){
									if(!err)
									{
										res.end(result);
									}
									else{
										 res.end('An error occurred');
									     console.log(err);
									}
								})
				}
			}  
		});
}


exports.updateStatus = function(req, res){
	
	var from_userid = req.param("userid");
	var to_user_id = req.session.userid;

	var msg_payload = { "to_userid": to_user_id, "from_userid": from_userid, "cid": "4" };
		
		mq_client.make_request('connectionQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else  
			{
				res.send({"InvitationAccepted":"Success"});
			}   
		});


	
}
