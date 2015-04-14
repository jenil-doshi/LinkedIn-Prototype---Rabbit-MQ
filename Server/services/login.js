var mysql = require('./mysql');
var ejs = require("ejs");
var express = require('express');

exports.login_request = function(msg, callback){
	
	var res = {};
	var getUser="select user_id, first_name, last_name, email_id, password, summary, date from users where email_id='"+msg.email+"'";
	console.log("Query is:"+getUser);

	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Results:" + JSON.stringify(results));
			if(results.length > 0){
				res.userid = results[0].user_id;
				res.firstname = results[0].first_name;
				res.code = "200";
				res.value = "Succes Login";
			}
			else {    
					res.code = "401";
					res.value = "Failed Login";
			}
			callback(null, res);
		}  
	},getUser);
}

exports.register_request = function(msg, callback){
	
	var res = {};
	
	var getUser="select user_id, first_name, last_name, email_id, password, summary, date from users where email_id='"+msg.email+"'";
	var getUserID = "select user_id from users where email_id='"+msg.email+"'";
	var insertUser = "insert into linkedin.users(first_name, last_name, email_id, password) values ('"+msg.firstname
		+"' , '"+msg.lastname
		+"' , '"+msg.email
		+"' , '"+msg.password+"')";	
	
	console.log("Query is:"+insertUser);
	
	mysql.dbcall(function(err,results){

		console.log("Results after call:"+JSON.stringify(results));
		if(results.length > 0){
			console.log("Registration cannot be done");
			res.userid = results[0].user_id;
			res.code = "401";
			res.value = "Already Registered with this ID, enter different email";
		}
		else 
		{
				mysql.dbcall(function(err,results){
				if(results.length > 0){
					console.log("Registration Fail");
					res.code = "401";
					res.value = "registeration Falied";
				}
				else 
				{
							mysql.dbcall(function(err,results){
							if(results.length > 0){
								console.log("Results after fetching userid:"+results);
								console.log("Registration Done");
								res.code = "200";
								res.value = "Registration Successful";
							}
							else 
							{
									console.log("Error in While Fetching DB");
							}  
							callback(null, res);
						},getUserID);
					
				}  
			},insertUser);
			
		}  
	},getUser);
}

exports.logout_request = function(msg, callback){
	
	var res = {};

	var insertDate="update users set date='"+msg.date+"' where user_id='"+msg.userid+"'";
	console.log("Quesry for date is:"+ insertDate);
 	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Results:" + JSON.stringify(results));
			if(results.affectedRows === 1){
				res.code = "200";
				res.value = "Success Logout";
			}
			else {    
					res.code = "401";
					res.value = "Failed Logout";
			}
			callback(null, res);
		}  
	},insertDate);
}

exports.search_request = function(msg, callback){
	
	var res = {};
	var searchUser = "select user_id, first_name, last_name, email_id, password, summary, date from users where first_name like '%"+msg.text+"%'";
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				if(results.length > 0)
				{
					res.code = "200";
					res.value = "Search Success";
					res.result = results;
					//res.render('connectUser',{results:results});
					//res.end();
					
				}  
				else
				{
					//alert("Nothing to return");
					res.code = "401";
					res.value = "Failed Logout";
				}
				callback(null, res);
		}
	},searchUser);
}