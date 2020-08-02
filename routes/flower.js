const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Flower = require('../models/Flower');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');

//show all fruit
router.get('/show',ensureAuthenticated, (req,res) => 
	Flower.findAll()
	.then(flower => {
		res.render('disFlower', {
			flower
		});
	})
	.catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Flower.findOne({where: {
		name: req.params.name
	}}).then(flower => {
		res.render('detailAll', {
			flower : flower.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

router.get('/',ensureAuthenticated, (req,res) => {
	res.send('Farm');
});

//display add flower form
router.get('/add',ensureAuthenticated, (req,res) => {
	res.render('addFlowers');
});

//add flower to database
router.post('/add' ,ensureAuthenticated, (req,res) => {

	let {name,season,fltype,description,imageUrl} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'PLease add a name'});
	}
	if(!season){
		errors.push({text: 'PLease add some season'});
	}
	if(!fltype){
		errors.push({text: 'PLease add a flower type'});
	}
	
	//check for errors
	if(errors.length > 0){
		res.render('addFlowers', {
			errors,
			name,
			season,
			fltype
		})};

	//insert into table
	Flower.create({
		name: name,
		season: season,
		fltype: fltype,
		description: description,
		imageUrl:imageUrl
	})
		.then(flower => res.redirect('/flower/add'))
		.catch(err => console.log(err));

});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();

  Flower.findAll({ where: { name: { [Op.like]: term } } })
    .then(flower => res.render('disFlower', { flower }))
    .catch(err => console.log(err));
});

module.exports = router;