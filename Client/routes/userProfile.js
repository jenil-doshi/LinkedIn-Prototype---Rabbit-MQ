var ejs = require("ejs");
var express = require('express');
var mq_client = require('../rpc/client');


exports.createProfile = function(req,res){
	if(!req.session.userid)
	{
		res.render('index', { title: 'LinkedIn' });
		res.end();
	}
	res.render('createProfile', function(err, result){
		if(!err){
			res.end(result);
		}
		else{
			 res.end('An error occurred');
             console.log(err);
		}
	});
}

exports.saveSummary = function(req, res){
	userid = req.session.userid;
	var summary = req.param("userSummary");
	var msg_payload = { "summary": summary, "userid": userid, "uid": "3" };
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Summary Saved");
				res.send({"save":"Success"});
			}
			else {    
					console.log("Summary not Saved");
					res.send({"save":"Fail"});
			}
		}  
	});
};

exports.saveExperience = function(req, res){
	userid = req.session.userid;
	var expData = {};
	data = req.param("expData");

	var msg_payload = { "data": data, "userid": userid, "uid": "2" };
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Exp Saved");
				res.send({"save":"Success"});
			}
			else {    
					console.log("Exp not Saved");
					res.send({"save":"Fail"});
			}
		}  
	});
};

exports.saveEducation = function(req, res){
	userid = req.session.userid;
	var eduData = {};
	data = req.param("eduData");
	var msg_payload = { "data": data, "userid": userid, "uid": "4" };
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Edu Saved");
				res.send({"save":"Success"});
			}
			else {    
					console.log("Edu not Saved");
					res.send({"save":"Fail"});
			}
		}  
	});
};

exports.saveSkill = function(req, res){
	userid = req.session.userid;
	var skills = req.param("skills");

	var msg_payload = { "skills": skills, "userid": userid, "uid": "5" };
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Skills Saved");
				res.send({"save":"Success"});
			}
			else {    
					console.log("Skills not Saved");
					res.send({"save":"Fail"});
			}
		}  
	});
};

exports.saveImage = function(req,res)
{
	console.log(req);
	//var img=req.param("img");
	var image=req.body.image;
	var userid=req.session.userid;
	

	var msg_payload = { "image": image, "userid": userid, "uid": "7" };
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Image Saved");
				res.send({"save":"Success"});
			}
			else {    
					console.log("Image not Saved");
					res.send({"save":"Fail"});
			}
		}  
	});	
};
