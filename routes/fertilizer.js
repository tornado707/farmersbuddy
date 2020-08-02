const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Fertilizer = require('../models/Fertilizer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');

//show all crops
router.get('/show', ensureAuthenticated, (req,res) => 
	Fertilizer.findAll()
	.then(fertilizer => {
		res.render('disFertilizer', {
			fertilizer
		})
	})
	.catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Fertilizer.findOne({where: {
		name: req.params.name
	}}).then(fertilizer => {
		res.render('detailAll', {
			fertilizer : fertilizer.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

//display add crop form
router.get('/add',ensureAuthenticated, (req,res) => {
	res.render('addFertilizer');
});

//add crop to database
router.post('/add' ,ensureAuthenticated,  (req,res) => {

	let {name,price,uses,imageUrl,videoUrl} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'Please add a name'});
	}
	if(!price){
		errors.push({text: 'Please add some price'});
	}
	
	
	//check for errors
	if(errors.length > 0){
		res.render('addFertilizer', {
			errors,
			name,
			price
		})};

	//insert into table
	Fertilizer.create({
		name: name,
		price: price,
		uses: uses,	
		imageUrl: imageUrl,
		videoUrl: videoUrl	
	})
		.then(fertilizer => res.redirect('/fertilizer/add'))
		.catch(err => console.log(err));
});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();

  Fertilizer.findOne({ where: { name: { [Op.like]: term } } })
    .then(fertilizer => res.render('disFertilizer', { fertilizer }))
    .catch(err => console.log(err));
});

module.exports = router;