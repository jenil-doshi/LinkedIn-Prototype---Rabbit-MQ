var mysql = require('./mysql');
var ejs = require("ejs");
var express = require('express');

exports.after_login_request = function(msg, callback){
	
	console.log("Session inside server:"+ msg.userid);
	var res = {};
	var getSummary="select user_id, first_name, last_name, email_id, password, summary, date, image from users where user_id='"+msg.userid+"'";
	var getEducation="select * from education where user_id='"+msg.userid+"'";
	var getExperience="select * from experience where user_id='"+msg.userid+"'";
	var getSkills="select * from skills where user_id='"+msg.userid+"'";
	
	console.log("Query is:"+getSummary);
	console.log("Query is:"+getEducation);
	console.log("Query is:"+getExperience);
	console.log("Query is:"+getSkills);
		
	mysql.dbcall(function(err,results){
		
		if(err){
			throw err;
		}
		if(results.length > 0)
		{
				var summary = [];
				summary = results;

			mysql.dbcall(function(err,results){
		
					if(err){
						throw err;
					}
					if(results.length > 0)
					{
						var education = [];
						education = results;

						mysql.dbcall(function(err,results){
		
							if(err){
								throw err;
							}
							if(results.length > 0)
							{
								var experience = [];
								experience = results;

								mysql.dbcall(function(err,results){
		
									if(err){
										throw err;
									}
									if(results.length > 0)
									{	
										var skills = [];
										for(var i=0; i< results.length; i++){
																									
											if(results.length > 0)
											{
												skills[i] = results[i].skillset;
											}
										}	

										res.summary = summary;
										res.experience = experience;
										res.education = education;
										res.skills = skills;
										callback(null, res);
									}
									else
									{
										res.code = "200";
										res.value = "Render Create Profile";
										callback(null, res);
									}
									//callback(null, res);
								},getSkills);
							}
							else
							{
								res.code = "200";
								res.value = "Render Create Profile";
								callback(null, res);
							}
							//callback(null, res);
						},getExperience);
					}
					else
					{
						res.code = "200";
						res.value = "Render Create Profile";
						callback(null, res);
					}
					//callback(null, res);
				},getEducation);
		}
		else
		{
			res.code = "200";
			res.value = "Render Create Profile";
			callback(null, res);
		}
		//callback(null, res);
	},getSummary);
}


exports.saveExperience_request = function(msg, callback){
	
	var res = {};
	var data = msg.data;
	console.log("Data :" + JSON.stringify(data));
	var count = Object.keys(data).length;
	var i = 0;
	for(var key in data){
		
		console.log("Company Name="+data[key].companyName);
		var saveExperience="insert into experience(company_name, title, location, description, end_date, start_date, user_id) values('"+data[key].companyName+"','"+data[key].title+"','"+data[key].location+"','"+data[key].description+"','"+data[key].enddate+"','"+data[key].startdate+"', '"+msg.userid+"')";
	

	 console.log("Query is:"+saveExperience);
	 
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(i == count){
				res.code = "200";
				res.value = "Exp Save success";
			}
			else {    
					res.code = "401";
					res.value = "Exp not save";
			}
		}  
		callback(null, res);
	},saveExperience);
	i++;
	}
}

exports.saveSummary_request = function(msg, callback){
	
	var res = {};
	var saveSummary="update users set summary='"+msg.summary+"' where user_id='"+msg.userid+"';";
	console.log("Query is:"+saveSummary);
	 
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				console.log("Summary Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Exp Save success";
		}  
		callback(null, res);
	},saveSummary);
}


exports.saveEducation_request = function(msg, callback){
	
	var res = {};
	var i=0;
	var data = msg.data;
	console.log("Data :" + JSON.stringify(data));
	for(var key in data){
		
		var saveEducation="insert into education(level, univ_name, field, grade, description, end_date, start_date, user_id) values('"+data[key].level+"','"+data[key].school+"','"+data[key].field+"','"+data[key].grade+"','"+data[key].dp+"','"+data[key].enddate1+"','"+data[key].startdate1+"', '"+msg.userid+"')";
	

	 console.log("Query is:"+saveEducation);
	 
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Summary Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Exp Save success";
		}  
		callback(null, res);
	},saveEducation);
	}
}

exports.saveSkills_request = function(msg, callback){
	
	var res = {};
	var skills = msg.skills;
	for(var i=0; i<skills.length; i++)
	{
   		var saveSkill="insert into skills(skillset, user_id) values('"+skills[i].text+"','"+msg.userid+"')";
	
	console.log("Query is:"+saveSkill);
	 
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Summary Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Skills Save success";
		}  
		callback(null, res); 
	},saveSkill);
}
}

exports.image_request = function(msg, callback){
	
	var res = {};
	var imgQuery="update linkedin.users set image='"+msg.image+"' where user_id="+msg.userid;
	
	console.log("query for image is: "+imgQuery);
	
	mysql.dbcall(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Image Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Image Save success";
		}  
		callback(null, res); 
	},imgQuery);
}

exports.editSummary_request = function(msg, callback){
	
	var res = {};
	var editSummary = "update users set";

		if(msg.userSummary)
			{
			  editSummary = editSummary + " " + "summary='"+msg.userSummary+"',";
			}
		if(msg.firstname)
			{
			  editSummary = editSummary + " " + "first_name='"+msg.firstname+"',";
			}
		if(msg.lastname)
			{
			  editSummary = editSummary + " " + "last_name='"+msg.lastname+"',";
			}
		if(msg.email)
			{
			  editSummary = editSummary + " " + "last_name='"+msg.email+"',";
			}
		editSummary = editSummary.substring(0, editSummary.length-1);
		editSummary = editSummary + " " + "where user_id='"+msg.userid+"'";
		console.log("Query is:" + editSummary);
		
		mysql.dbcall(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("Summary Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Summary Save success";
			}  
			callback(null, res); 
		},editSummary);
}




exports.editExperience_request = function(msg, callback){
	
	var res = {};
  		var editExperience = "update experience set";
		/*          Experience            */
		if(msg.companyName)
			{
			  editExperience = editExperience + " " + "company_name='"+msg.companyName+"',";
			}
		if(msg.title)
			{
			  editExperience = editExperience + " " + "title='"+msg.title+"',";
			}
		if(msg.location)
			{
			  editExperience = editExperience + " " + "location='"+msg.location+"',";
			}
		if(msg.startdate)
			{
			  editExperience = editExperience + " " + "start_date='"+msg.startdate+"',";
			}
		if(msg.enddate)
			{
			  editExperience = editExperience + " " + "end_date='"+msg.enddate+"',";
			}
		if(msg.description)
			{
			  editExperience = editExperience + " " + "description='"+msg.description+"',";
			}
		
		editExperience = editExperience.substring(0, editExperience.length-1);
		editExperience = editExperience + " " + "where user_id='"+msg.userid+"'";
		console.log("Query is:" + editExperience);
		
		mysql.dbcall(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("Exp Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Exp Save success";
			}  
			callback(null, res); 
		},editExperience);
}

exports.editEducation_request = function(msg, callback){
	
	var res = {};
  		var editEducation = "update education set";  

		if(msg.school)
			{
			  editEducation = editEducation + " " + "univ_name='"+msg.school+"',";
			}
		if(msg.field)
			{
			  editEducation = editEducation + " " + "field='"+msg.field+"',";
			}
		if(msg.grade)
			{
			  editEducation = editEducation + " " + "grade='"+msg.grade+"',";
			}
		if(msg.dp)
			{
			  editEducation = editEducation + " " + "description='"+msg.dp+"',";
			}
		if(msg.startdate)
			{
			  editEducation = editEducation + " " + "start_date='"+msg.startdate+"',";
			}
		if(msg.enddate)
			{
			  editEducation = editEducation + " " + "end_date='"+msg.enddate+"',";
			}
		if(msg.level)
			{
			  editEducation = editEducation + " " + "level='"+msg.level+"',";
			}
		editEducation = editEducation.substring(0, editEducation.length-1);
		editEducation = editEducation + "where user_id='"+msg.userid+"'";
		console.log("Query is:" + editEducation);

		mysql.dbcall(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("Edu Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "Edu Save success";
			}  
			callback(null, res);
		},editEducation);
}


exports.editSkills_request = function(msg, callback){
	
	var res = {};

  		var editSkills = "update skills set skillset='"+msg.skills+"' where user_id='"+msg.userid+"'";
		
		console.log("Query is:" + editSkills);
		
		mysql.dbcall(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("skills Saved:" + JSON.stringify(results));
				res.code = "200";
				res.value = "skills Save success";
			}  
			callback(null, res);
		},editSkills);
 
}