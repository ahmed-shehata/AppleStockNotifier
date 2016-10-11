var request = require("request");
var nodemailer = require('nodemailer');
var notifier = require('node-notifier');

var myArgs = process.argv.slice(2);
var emailFrom = myArgs[0];
var emailFromSMTP = myArgs[0].replace("@", "%40");
var password = myArgs[1];

var emailTo = myArgs[2];

var appleStoreCode = myArgs[3];

var iPhoneModel = myArgs[4];
var iPhoneColor = myArgs[5];
var iPhoneCapacity = myArgs[6];



var transporter = nodemailer.createTransport('smtps://' + emailFrom + ':' + password + '@smtp.gmail.com');
var url = "http://www.istocknow.com/live/live.php?type=" + iPhoneModel + "&operator=&color=" + iPhoneColor + "&model=" + iPhoneCapacity + "&ajax=1&nobb=false&notarget=false&noradioshack=false&nostock=false";
var mailOptions = {
    from: '"Tim Cook" <' + emailFrom + '>',
    to: emailTo,
    subject: 'iPhone is Available ✔',
    text: 'Hello! iPhone is now available',
    html: '<b>Hello! iPhone is now available</b>'
};

function sendAvailableEmail() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function notifyInSystem() {
    notifier.notify({
        title: 'iPhone is Available!',
        message: 'Hello! iPhone is Available',
        icon: null,
        sound: false,
        wait: true
    }, function(err, response) {
        console.log(response);
    });
    notifier.on('click', function(notifierObject, options) {
        console.log("CLICKED!");
    });

}


var minutes = 0.5,
    the_interval = minutes * 60 * 1000;
setInterval(function() {
    request({
        url: url,
        json: true
    }, function(error, response, body) {

        if (!error && response.statusCode === 200 && body.dataz !== undefined) {
            var live = body.dataz[appleStoreCode].live;
            var dt = new Date();
            var utcDate = dt.toUTCString();
            if (live == '1') {
                sendAvailableEmail();
                notifyInSystem();
                console.log(utcDate + "iPHONE!!!! IS AVAILABLE");
            } else {
                console.log(utcDate + " Nope..");
            }
        }
    });
}, the_interval);