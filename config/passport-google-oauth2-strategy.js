const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const env=require('./environment');
const User=require('../models/user');
//tell passport to use new strategy
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_callback_URL,
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error",err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.email[0].value,
                password:crypto.randomBytes(20).toString('hex')

            },function(err,user){
                if(err){
                    console.log('error in creating user',err);
                    return;
                }
                return done(null,user);
            });


        }
    });
}    
));

module.exports=passport;