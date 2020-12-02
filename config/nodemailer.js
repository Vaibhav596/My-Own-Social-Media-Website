const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//We need to det transporter for sending emails
//This part defines that how the communication is going to take place
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure: false,
    //auth is required for the authentication for account with which you will be sending mails
    auth:{
        user: 'vaibhavgarg596@gmail.com',
        pass: 'Vaibhavgarg@2001'
    }
});

//We need this for sending template engines
//relativePath is from where the mail is being sent(ejs template pathw w.r.t mailers folder)
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        //data is which needs to be filled
        data,
        //template is basically composed of ejs template and data
        function(err,template){
            if(err){
                console.log("Error in rendering template",err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate: renderTemplate
}