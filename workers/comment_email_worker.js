const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');
//Every queue has a process to tell 
// a worker that whenever a comment gets added just come here to process
//job argument is for job to be done and contains data 
queue.process('emails',function(job, done){
    console.log('emails worker is processing a job',job.data);
    commentsMailer.newComment(job.data)
})