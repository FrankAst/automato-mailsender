var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var async = require('async');
var mail = require('../mailsender');
var Users = require('../dbuser');
var mongoose = require('mongoose');
var sync = require('../synchronizer');
mongoose.connect('mongodb://127.0.0.1:27017/usermails');


router.post('/sendlist', function(req, res){ //Sending message to cliens mail
	mail.send(req.body.mails, req.body.content);

	var maillist = req.body.mails;
    var content=req.body.content;
	maillist.forEach(function(datalist){
		Users.findOne({mail: datalist,content: content},function(err,u) {
		    if(!u){    
		      	var user = new Users({
			      mail:datalist,
                    content:content
		    	})
		    	user.save();
		    	console.log('Saved');
	    	}
	  	})
	})
    
})


router.get('/getuserlist', function(req, res){
	var content = fs.readdirSync(path.join(__dirname, '..', '/mails/'), 'utf-8');
	var info = {
				users: '',
				content: content,
				all_statistics: ''
			};
sync.counterInit('info', content.length);
var dbaselist = ['<tr><th>Content</th><th>Client</th><th>read</th><th>click</th></tr>']; // empty array , for sending html page
var array = [];

	content.forEach(function(current_content){
	 if(current_content[0]!='.') //if hidden file exists

	Users.find({ content: current_content}).exec(function(err, found){
	var allopen=0;
	var allclick=0;
	if(err) console.log(err);
	console.log(current_content);
        found.forEach(function(item){ //ALL CLICK AND ALLOPEN
            allopen+=item.opensum;
            allclick+=item.clicksum;
        });
				var	obj = {
					allopen: allopen,
					allclick: allclick,
					content: current_content
				}
				array.push(obj);
				sync.callCount('info', function() {
					res.send(info); 
					sync.removeCounter('info');
				})
});

});
	Users.find({}, function(err, subjects) {
		if(err) console.log(err)
		if(!subjects) console.log('Empty')
		if(subjects){
			subjects.map(function(listuser){
				if(listuser.mail&&listuser.content){
					dbaselist.push('<tr><td>'+listuser.content+'</td><td>'+listuser.mail+'</td><td id=read>'+listuser.opensum+'</td><td id=click>'+listuser.clicksum+'</td></tr>');
				}

			})
			info.users=dbaselist;
			info.all_statistics=array; 
				sync.callCount('info', function() {
					// console.log('jghvbkn');
					res.send(info); 
					sync.removeCounter('info');
				})
		}
	})

	})




router.get('/getimage', function(req, res){ // Opened message
	var mail = req.query.mail;
	var content = req.query.content;
	Users.findOne({mail: mail,content:content},function(err,u) {
		if(err)console.log(err);
	    if(u){
	      	console.log('Opened at:' + ' ' + u.mail);
	      	u.opensum=1;
	      	u.save();
	    }else{
	    	console.log('Not found user');
	    }
	})
	res.send('ok');

	// res.sendFile(path.join(__dirname,'../logo.png'));


})

router.get('/redir', function(req, res){ // Clicked to link
	var mail = req.query.mail;
	var content = req.query.content;
	// console.log(req.query)
	Users.findOne({mail: mail,content:content},function(err,u) {
	    if(u){
			// u.content=content;
	      	u.clicksum=+1;
	      	u.save();
	    }else{
    		console.log('Clicked') //target mail
	    }
	});
	   res.writeHead(301,
			{Location: req.query.redir }//+ new Date().getTime()
		);
        res.end();

})
module.exports = router
