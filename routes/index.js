const express = require('express');
const router = express.Router();

const Crop = require('../models/Crop');
const Fertilizer = require('../models/Fertilizer');
const Flower = require('../models/Flower');
const Fruit = require('../models/Fruit');
const Machine = require('../models/Machine');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome', {layout: 'landing'}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
  	layout: 'hmpglanding',
  	user: req.user,
  })
);

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});


// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();
/*Crop.findAll({ where: { name: { [Op.like]: term } } })
    .then(crop => res.render('disCrop', { crop, term }))
    .catch(err => console.log(err));*/

Crop.findAll({ where: { name: { [Op.like]: term } } }).then(crop => {
	Fertilizer.findAll({ where: { name: { [Op.like]: term } } }).then(ferti => {
		Flower.findAll({ where: { name: { [Op.like]: term } } }).then(flower => {
			Fruit.findAll({ where: { name: { [Op.like]: term } } }).then(fruit => {
				Machine.findAll({ where: { name: { [Op.like]: term } } }).then(machine => {
					
					if(crop != null){
						console.log(crop);
						res.render('disCrop', { crop, term });
					}

					
					if(ferti != null)
					{
						console.log(ferti);
						res.render('disFertilizer', { ferti, term });
					}
					
					if(flower != null)
					{
						console.log(flower);
						res.render('disFlower', { flower, term });
					}
					
					if(fruit != null)
					{
						console.log(fruit);
						res.render('disFruit', { fruit, term });
					}
					
					if(machine != null)
					{
						console.log(machine);
						res.render('disMachine', { machine, term });
					}
					
				})
			})
		})
	})
}).catch(err => console.log(err));
   /* Crop.find().then((inf)=>{
    	ferti.find().then((inf2)=>{

    	})
    })*/
});

module.exports = router;