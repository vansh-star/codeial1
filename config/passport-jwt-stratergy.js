const passport=require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment');
const User=require('../models/user');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : env.jwt_secret

}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log("Error");
            return;
        }
        if(user){
            return done(null,user);
        }
        
            return done(null,false);
        
    })
}))

module.exports=passport;