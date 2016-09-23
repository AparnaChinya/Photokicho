var express = require('express');
var port = process.env.port || 3000;
var multer = require('multer');
var upload = multer();
var app = express();
var router= express.Router();
var nodemailer=require('nodemailer');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname+'/public'));
app.use('/angular-route',express.static(__dirname+'/angular-route'));
app.use('/html',express.static(__dirname + '/public/html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

var userSchema = new mongoose.Schema({
	username :String,
	password: String,
	firstname: String,
	lastname: String,
	email:String,
	roles: [String]
});

var userModel = mongoose.model("userModel",userSchema);

var admin = new userModel({
	username: "Jane",
	password: "Jane",
	firstName: "Jane",
	lastname: "Smith",
	roles: ['Admin']
});

var student = new userModel({
	username: "Bob",
	password: "Bob",
	firstName: "Bob",
	lastname: "Marley",
	roles: ['Student']
});

admin.save();
student.save();
passport.use(new localStrategy(
	function(username,password,done){
		userModel.findOne({username:username,password:password},function(err,user){
			if (user){
			return done(null, user);
				}
			else return done(null,false,{message : "Unable to login"});
			}	
		);		
}));

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user,done){
	done(null,user);
});

app.post('/contactus',upload.array(),function(req,res,next){
	console.log(req.body);
	var srvc=req.body;
	var transporter = nodemailer.createTransport("SMTP",{
		service : 'Gmail',
		auth : {
			XOAuth2 : {
				user : srvc.emailid,
				clientId : "<REPLACE>",
				clientSecret : "<REPLACE>",
				refreshToken : "<REPLACE>"
				}
			}
	});
	var mailOptions = {
		from: srvc.emailid,
		to: '"<REPLACE>"',
		subject: 'booking',
		text : srvc.message
	};
	console.log(mailOptions);

	transporter.sendMail(mailOptions,function(err,info){
		if(err){
			console.log(err);
		}
		else {
			console.log("Message sent" + info);
			transporter.close();
			res.send('email sent successfully');			
		}		
	});
});

app.post('/login',upload.array(),passport.authenticate('local'),function(req,res,next){
	res.json(req.user);
});

app.use('/*', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('Application listening on port' + port);