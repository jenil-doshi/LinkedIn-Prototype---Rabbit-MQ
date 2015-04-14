
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , userProfile = require('./routes/userProfile')
  , editProfile = require('./routes/editProfile')
  , connectUser = require('./routes/connectUser')
  , http = require('http')
  , path = require('path');

var app = express();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat', cookie: { maxAge: 300000 }}));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/signin', user.signin);
app.get('/successLogin', user.successLogin);
app.post('/signup', user.signup);
app.get('/successRegister', user.successRegister);
app.get('/signout', user.signout);
app.get('/displaySearch/:srch', user.displaySearch);

app.get('/createProfile', userProfile.createProfile);
app.get('/viewProfile', user.successLogin);
app.post('/saveSummary', userProfile.saveSummary);
app.post('/saveExperience', userProfile.saveExperience);
app.post('/saveEducation', userProfile.saveEducation);
app.post('/saveSkill', userProfile.saveSkill);
app.post('/uservalue', userProfile.saveImage);

app.post('/viewSummary', editProfile.viewSummary);
app.post('/viewExperience', editProfile.viewExperience);
app.post('/viewEducation', editProfile.viewEducation);
app.post('/viewSkills', editProfile.viewSkills);

app.post('/insertPendingConnection', connectUser.insertPendingConnection);
app.get('/connect', connectUser.connect);
app.get('/invitation', connectUser.invitation);
app.post('/updateStatus', connectUser.updateStatus);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
