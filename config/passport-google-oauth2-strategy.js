const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//WE NEED TO TELL PASSPORT TO USE GOOGLE STRATEGY
passport.use(new googleStrategy({
        clientID:"106971747520-mioufqnk8bq1vqoi8m2ktpn8bkmeugmh.apps.googleusercontent.com",
        clientSecret:"tayoqkBwoUf6wt5yL9_95aCa",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    //GOOGLE GENERATES THE ACCESS TOKEN AND RERFRESH TOKEN AS WELL
    //IF ACCESS TOKEN EXPIRES THEN WE USE REFRESH TOKEN TO GET NEW ACCESS TOKEN
    //PROFILE CONTAINS THE EMAIL ID selected by User
    function(accessToken, refreshToken, profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google Strategy passport",err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes.toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in google Strategy passport",err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))
module.exports = passport;