// Require nodemailer with fully set-up configurations
const nodeMailer = require('../config/nodemailer');


//Create a funcntion which will send mail
//New way of exporting a method
exports.newComment = (comment) => {
    //We called this function from configuration and passed the required arguments
    //This line is required for the rendering only
    //Adding extension is important
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    console.log('inside new comment mailer');
    //sendMail() is used to send Mail
    nodeMailer.transporter.sendMail({
        from:'ConnectUp',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in Sending mail",err);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
};


//