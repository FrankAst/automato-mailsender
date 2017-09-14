//'use strict';
const nodemailer = require('nodemailer');
var fs = require('fs');
//fs.readFileSync( __dirname + '/index.html');
// var messageContent = fs.readFileSync(__dirname + '/cubiqmail.html','utf8');
// console.log(typeof((messageContent)),'MSG CONTENT <<<----')
// create reusable transporter object using the default SMTP transport
var ourServer = 'http://146.185.131.163:3000/'
// var ourServer = 'http://127.0.0.1:3000/';

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'automatofatima@gmail.com',
        pass: '!Q@W#E$R%T'


    }
});


// setup email data with unicode symbols


// send mail with defined transport object
function sendAll(mailslist, content){
    var messageContent = fs.readFileSync(__dirname + '/mails/' + content , 'utf8');
    mailslist.forEach( function(to ,i ,array){
        console.log(to);
        var mailOptions = {
            from: '"Automato" <automatofatima@gmail.com>', // sender address
            to: array[i],
            subject: 'Полезное от Automato ✔', // ✔ Subject line
            html: messageContent // html body
        };
        var getimages = ourServer + 'api/getimage?content=' + content + '&mail=' + to + '&t=' + new Date().getTime();
        var getredir = ourServer + 'api/redir?content=' + content + '&mail=' + to + '&t=' + new Date().getTime();

        mailOptions.to = to;

        mailOptions.html=mailOptions.html.replace(/abracadabra123456\-\-\-/g, getimages);
        mailOptions.html=mailOptions.html.replace(/abracadabra123456\+\+\+/g, getredir);

        console.log(getimages, getredir);

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s %s', info.messageId, info.response, info);
        });

    })

}

module.exports.send = sendAll;