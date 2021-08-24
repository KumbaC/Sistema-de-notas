const express = require('express');
const router = express.Router();
const node = require('../models/node');
const {isAuthenticated} = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res)=>{ 

res.render('notes/new-note')


});


router.post('/notes/new-note', isAuthenticated, async (req, res)=>{ 
//console.log(req.body)
const {title, description}  = req.body;
const errors  = [];


if(!title){

  errors.push({text: "Por favor rellena el titulo"});

}

if(!description){

      errors.push({msj: "Por favor rellena la descripcion"});

}

if(errors.length > 0){

  res.render('notes/new-note', {

    errors,
    title,
    description 

  });

}else{
          const newNode =  new node({title, description})
           newNode.user_id  = req.user.id
           await newNode.save();
           req.flash('success_msg', 'Nota agregada satisfactoriamente')
           res.redirect('/notes');
}



});
// LISTA LOS DATOS DE LA BASE DE DATOS 

router.get('/notes', isAuthenticated, async (req, res) => {
    const nodes = await node.find({user_id: req.user.id})
    .sort({ date: "desc" })
    .lean();
     res.render("notes/notes-find", { nodes });

  })


router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => { 
     await node.findByIdAndDelete(req.params.id);
     //const { id } = req.params;
    // await node.remove({_id: id});
     req.flash("error_msg", "Nota eliminada con exito");
     res.redirect('/notes');

 });

 router.get('/notes/edit/:id', isAuthenticated, async (req, res) => { 

         const nodes =  await node.findById(req.params.id).lean();

         res.render('notes/edit-note', { nodes });
   

 });

 router.put('/notes/new-edit/:id',  isAuthenticated, async (req, res, next)  => {
     const { title, description } = req.body;
  await node.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("update_msg", "¡ La nota fue actualizada con exito !");
  res.redirect("/notes");
});

module.exports = router;