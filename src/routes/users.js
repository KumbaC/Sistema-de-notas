const express = require('express');
const router = express.Router();
const user = require('../models/user');
const passport = require('passport');


router.get('/users/signin', (req, res) =>{

    res.render('users/signin');
})
router.get('/users/signup', (req, res) =>{

    res.render('users/signup');
})

router.get('/users/logout', (req, res)  =>{
   req.logout();
   res.redirect('/');

});

router.post('/users/signin', passport.authenticate('local', {

   successRedirect: '/notes', 
   failureRedirect: '/users/signin',
   failureFlash:     true,  

}));



router.post('/users/signup', async (req, res) =>{
   const {name, email, password, confirm_password} = req.body;
   const errors = [];
 

  if(name.length <= 0){

    errors.push({text:'El campo name no puede estar vacio'})

  }

 if(password != confirm_password){

    errors.push({text:"Las constraseñas no coinciden"})

  }

  if(password.length < 4){

    errors.push({text:"Las constraseñas no puede tener un rango menor de 8 caracteres"})

  }
if(errors.length > 0){

   res.render('users/signup', {errors, name, email, password, confirm_password});
  }else{
    const emailUser = await user.findOne({email: email})
    if(emailUser){
        req.flash("error_msg", 'Este email ya esta registrado en la base de datos')
        res.redirect('/users/signup')
    }
    const newUser = new user({name, email, password});
   newUser.password =  await newUser.encryptPassword(password)
    await newUser.save();
    req.flash("success_msg", "¡Bienvenido, usted se registro con exito !");
    res.redirect('/users/signin')
  }
   
})

module.exports = router;