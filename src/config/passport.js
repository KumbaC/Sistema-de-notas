const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/user');

passport.use(new LocalStrategy ({
      usernameField: "email",
      }, async (email, password, done)=> {
       const User = await user.findOne({email:email});

       if(!User) {

       	return done(null, false, {message: "Usuario no encontrado"});
       }else{
        const match = await User.matchPassword(password);
       if(match){

              return done(null, User);
         }else{
               return done(null, false, {message: "Contraseña incorrecta"});

         }
       }
       
}));
passport.serializeUser((User, done) =>{
 done(null, User.id)
});

passport.deserializeUser((id, done)=>{
   
   user.findById(id, (err, user)=>{ 
            
            done(err, user)
   });

});