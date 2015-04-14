var ejs = require("ejs");
var express = require('express');
var mq_client = require('../rpc/client');

exports.signin = function(req,res)
{
	var email = req.param("username");
	var msg_payload = { "email": email, "id": "1" };
	req.session.email = email;
	
	mq_client.make_request('loginQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				req.session.userid =results.userid;
				req.session.firstname = results.firstname;
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
}

exports.successLogin = function(req,res)
{
	userid = req.session.userid;
	var msg_payload = { "userid": userid, "uid" : "1"};
	//req.session.email = email;
	//console.log("In POST Request = UserName:"+ email);
	
	mq_client.make_request('userQueue',msg_payload, function(err,results){
		
		//console.log("Inside home.js:"+JSON.stringify(results));
		if(err){
			throw err;
		}	
		else 
		{
			console.log("Results after mq returned:" + JSON.stringify(results));
			if(results.code == 200){
				res.render('createProfile',function(err, result) {
			        // render on success
			        if (!err) {
			        	console.log("Summary Returned");
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
    			});
			}
			else {   
					res.render('viewProfile', 
						{
							summary: results.summary,
							experience : results.experience,
							education : results.education,
							skills: results.skills,
						}, function(err, result){
						if(!err){
							res.end(result);
						}
						else{
						 		res.end('An error occurred');
						  		console.log(err);
						 	}
						});				
			}
		}  
	});
}

exports.signup = function(req,res)
{
	var email = req.param("email")
	var password = req.param("password");
	var lastname = req.param("lastname");
	var firstname = req.param("firstname");

	var msg_payload = { "email": email, "password": password, "lastname": lastname, "firstname": firstname, "id": "2" };

	mq_client.make_request('loginQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Registered Successfully");
				req.session.userid =results.userid;
				res.send({"register":"Success"});
				res.end(results);
			}
			else {    
				console.log("Cannot register");
				res.send({"register":"Fail"});
				res.end("error occured");
			}
		}  
	});
}

exports.successRegister = function(req,res)
{
	if(!req.session.userid)
	{
		res.render('index', { title: 'LinkedIn' });
		res.end();
	}
	res.render('successRegister',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}

exports.signout = function(req, res){

	var dt=Date().toString();
	var userid = req.session.userid;
	var msg_payload = { "date": dt, "userid": userid, "id" : "3"};

	mq_client.make_request('loginQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Logout Successfully");
				res.send({"Logout":"Success"});
				res.end(results);
			}
			else {    
				console.log("Cannot logout");
				res.send({"Logout":"Fail"});
				res.end("error occured");
			}
		}  
	});

    req.session.destroy(function(err) {
           
           if(!err){
                res.render('index', { title: 'LinkedIn' }, function(err, result) {
			        // render on success
			        if (!err) {
			        	console.log("Session Destroyed");
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
    			});
            }else{
                
                res.send('error');
                res.end();
            }
        });
}

exports.displaySearch = function(req,res){
	var text = req.param("srch");

	var msg_payload = { "text": text, "id": "4" };

	mq_client.make_request('loginQueue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			var result = results.result;
			if(results.code == 200){
				res.render('connectUser',{results:result});
				res.end();
			}
			else {    
				alert("Nothing to return");
			}
		}  
	});
}