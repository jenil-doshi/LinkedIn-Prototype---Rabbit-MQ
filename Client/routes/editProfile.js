var ejs = require("ejs");
var express = require('express');
var mq_client = require('../rpc/client');


exports.viewSummary = function(req, res){
 	console.log(req.body);
 	if(req.param('firstname') === undefined && req.param('lastname') === undefined
 	&& req.param('email') === undefined &&req.param('userSummary') === undefined )
 	{
 		console.log("Nothing changed");
 		res.send("nothing changed");
 	}
 	else
 	{
 		userid = req.session.userid;
  		var summary = req.param("userSummary");
  		var firstname = req.param("firstname");
  		var lastname = req.param("lastname");
  		var email = req.param("email");
 		var msg_payload = { "userid": userid, "summary": summary, "firstname": firstname, "lastname": lastname, "email": email, "uid": "8" };
		
		
		mq_client.make_request('userQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					console.log("save success");
					res.send({"save":"Success"});
				}
				else {    
					
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
	}
}


exports.viewExperience = function(req, res){
	console.log(req.body);
 	if(req.param('companyName') === undefined && req.param('title') === undefined &&
 	req.param('location') === undefined && req.param('startdate') === undefined &&
 	req.param('enddate') === undefined && req.param('description') === undefined)
 	{
 		console.log("Nothing changed");
 		res.send("nothing changed");
 	}
 	else
 	{
 		userid = req.session.userid;
 		var companyName = req.param("companyName");
 		var title = req.param('title');
 		var location = req.param('location');
 		var startdate = req.param('startdate');
 		var enddate = req.param('enddate');
 		var description = req.param('description');

 		var msg_payload = { "enddate": enddate, "description": description, "userid": userid, "companyName": companyName, "title": title, "location": location, "startdate": startdate, "uid": "9" };
		
		
		mq_client.make_request('userQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					console.log("save success");
					res.send({"save":"Success"});
				}
				else {    
					
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
	}
}


exports.viewEducation = function(req, res){
 	console.log(req.body);
 	if( req.param('school') === undefined && req.param('field') === undefined &&
 	req.param('grade') === undefined && req.param('dp') === undefined &&
 	req.param('startdate') === undefined && req.param('enddate') === undefined &&
 	req.param('level') === undefined  )
 	{
 		console.log("Nothing changed");
 		res.send("nothing changed");
 	}
 	else
 	{
 		userid = req.session.userid;
 		var school = req.param('school');
 		var field = req.param('field');
 		var grade = req.param('grade');
 		var dp = req.param('dp');
 		var startdate = req.param('startdate');
 		var enddate = req.param('enddate');
 		var level = req.param('level');

 		var msg_payload = { "level": level, "enddate": enddate, "dp": dp, "userid": userid, "school": school, "field": field, "grade": grade, "startdate": startdate, "uid": "10" };
		
		
		mq_client.make_request('userQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					console.log("save success");
					res.send({"save":"Success"});
				}
				else {    
					
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
	}
}


exports.viewSkills = function(req, res){
 	console.log("Skills in request param"+req.param('skills'));
 	if(req.param('skills') === undefined)
 	{
 		console.log("Nothing changed");
 		res.send("nothing changed");
 	}
 	else
 	{
 		userid = req.session.userid;
 		var skills = req.param("skills");
  		
  		var msg_payload = { "userid": userid, "skills": skills, "uid": "11" };
		
		mq_client.make_request('userQueue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{
				if(results.code == 200){
					console.log("save success");
					res.send({"save":"Success"});
				}
				else {    
					
					console.log("save success");
					res.send({"save":"Fail"});
				}
			}  
		});
	}
}