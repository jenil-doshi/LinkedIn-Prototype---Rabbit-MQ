var mysql = require('./mysql');
var ejs = require("ejs");
var express = require('express');

exports.insert_request = function(msg, callback){
	
	var res = {};
	var insertPendingConnection = "insert into connection(from_user_id, to_user_id, status) values('"+msg.from_userid+"', '"+msg.to_userid+"', 'pending')";

	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.code = "200";
			res.value = "Success";
		}  
		callback(null, res);
	},insertPendingConnection);
}

exports.connect_request = function(msg, callback){
	
	var res = {};
	var getUser="select * from users where user_id NOT IN('"+msg.userid+"')";

	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				if(results.length > 0){

					var firstname = [];
					var lastname = [];
					var emailid = [];
					var userid = [];
					for(var i=0; i<results.length;i++){
						userid[i] = results[i].user_id;
						firstname[i] = results[i].first_name;
						lastname[i] = results[i].last_name;
						emailid[i] = results[i].email_id;
					}
					
					res.code = "200";
					res.value = "Success";
					res.userid = userid;
					res.firstname = firstname;
					res.lastname = lastname;
					res.emailid = emailid;
				}
				else {    
					
					console.log("Cannot fetch user data");
				}
		}  
		callback(null, res);
	},getUser);
}



exports.connectedUser_request = function(msg, callback){
	
	var res = {};
	var getConnStat = "select * from users where user_id in (select from_user_id from connection where status='pending' and to_user_id='"+msg.userid+"')";
mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

					var firstname = [];
					var lastname = [];
					var emailid = [];
					var userid = [];
					for(var i=0; i<results.length;i++){
						userid[i] = results[i].user_id;
						firstname[i] = results[i].first_name;
						lastname[i] = results[i].last_name;
						emailid[i] = results[i].email_id;
					}
					res.code = "200";
					res.value = "Success";
					res.userid = userid;
					res.firstname = firstname;
					res.lastname = lastname;
					res.emailid = emailid;
					
				}
				else {    
						
						var showConnections = "select first_name from users where user_id in (select from_user_id from connection where status='accepted' and to_user_id="+msg.userid+");"
						mysql.dbcall(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								var first_name = [];
								
								for(var i=0; i<results.length;i++){
									first_name[i] = results[i].first_name;
									}
								
								res.code = "200";
								res.value = "Success";
								res.firstname = first_name;
								res.name = msg.name;
								
							}
							callback(null, res);  
					},showConnections);
					}
		}	
		callback(null, res);							
	},getConnStat);
}

exports.AcceptInvitation_request = function(msg, callback){
	
	var res = {};
	var updateStatus = "update connection set status = 'accepted' where to_user_id='"+msg.to_userid+"' and from_user_id='"+msg.from_userid+"'";
	console.log("Query is:" + updateStatus);
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.code = "200";
			res.value = "Success";
		}  
		callback(null, res);
	},updateStatus);	
}