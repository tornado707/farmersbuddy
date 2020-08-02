const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const db = require('../config/database');

const Crop = require('../models/Crop');
const Fertilizer = require('../models/Fertilizer');
const Flower = require('../models/Flower');
const Fruit = require('../models/Fruit');
const Machine = require('../models/Machine');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');

//show all crops
router.get('/show', ensureAuthenticated, (req,res) => 
	Crop.findAll()
	.then(crop => {
		res.render('disCrop', {
			layout: 'main',
			crop
		})
	}).catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Crop.findOne({where: {
		name: req.params.name
	}}).then(crop => {
		res.render('detailAll', {
			crop : crop.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

//display add crop form
router.get('/add',ensureAuthenticated, (req,res) => {
	res.render('addCrop');
});

//add crop to database
router.post('/add' ,ensureAuthenticated, (req,res) => {

	let {name,season,crtype,description,imageUrl} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'Please add a name'});
	}
	if(!season){
		errors.push({text: 'Please add some season'});
	}
	if(!crtype){
		errors.push({text: 'Please add a crop type'});
	}
	
	//check for errors
	if(errors.length > 0){
		res.render('addCrop', {
			errors,
			name,
			season,
			crtype,
			imageUrl
		})};

	//insert into table
	Crop.create({
		name: name,
		season: season,
		crtype: crtype,
		description: description,
		imageUrl: imageUrl
	})
		.then(crop => res.redirect('/crop/add'))
		.catch(err => console.log(err));
});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();
Crop.findAll({ where: { name: { [Op.like]: term } } })
    .then(crop => res.render('disCrop', { crop, term }))
    .catch(err => console.log(err));

   /* Crop.find().then((inf)=>{
    	ferti.find().then((inf2)=>{

    	})
    })*/
});

module.exports = router;