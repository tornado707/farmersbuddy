const express = require('express');
const router = express.Router();

const Crop = require('../models/Crop');
const Fertilizer = require('../models/Fertilizer');
const Flower = require('../models/Flower');
//const Fruit = require('../models/Fruit');
//const Machine = require('../models/Machine');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome', {layout: 'landing'}));

// Dashboard
router.get('/dashboard', (req, res) =>
  res.render('dashboard', {
  	layout: 'hmpglanding',
  	user: req.user,
  })
);

// Login
router.post('/login', forwardAuthenticated, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});


// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;


  // Make lowercase
 // term = term.toLowerCase();
/*Crop.findAll({ where: { name: { [Op.like]: term } } })
    .then(crop => res.render('disCrop', { crop, term }))
    .catch(err => console.log(err));*/

Crop.findAll({ where: { name: { [Op.like]: term } } }).then(crop => {
		res.render('disCrop', {
			layout: 'main',
			crop
		})
	Fertilizer.findAll({ where: { name: { [Op.like]: term } } }).then(ferti => {
		res.render('disFertilizer', {
			layout: 'main',
			ferti
		})

		Flower.findAll({ where: { name: { [Op.like]: term } } }).then(flower => {
				
					
					if(crop != null)
					{
						//console.log(crop);
						res.json(crop);
					}else{
						console.log('not found in crop')
					}
					
					if(ferti != null)
					{
						//console.log(ferti);
						res.json(ferti);
					}else{
						console.log('not found in fertilizer')
					}
					
					if(flower != null)
					{
						//console.log(flower);
						res.json(flower);
					}else{
						console.log('not found in flower')
					}
					
					
				
		})
	})
}).catch(err => console.log(err));
   /* Crop.find().then((inf)=>{
    	ferti.find().then((inf2)=>{

    	})
    })*/
});


module.exports = router;