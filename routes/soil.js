const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Soil = require('../models/Soil');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');

//show all soil
router.get('/show',ensureAuthenticated, (req,res) => 
	Soil.findAll()
	.then(soil => {
		res.render('disSoil', {
			soil
		});
	})
	.catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Soil.findOne({where: {
		name: req.params.name
	}}).then(soil => {
		res.render('detailAll', {
			soil : soil.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

//display add soil form
router.get('/add',ensureAuthenticated, (req,res) => {
	res.render('addSoil');
});

//add soil to database
router.post('/add' ,ensureAuthenticated, (req,res) => {

	let {name,type,place} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'Please add a name'});
	}
	if(!type){
		errors.push({text: 'Please add type'});
	}
	if(!place){
		errors.push({text: 'Please add place'});
	}
	
	//check for errors
	if(errors.length > 0){
		res.render('addSoil', {
			errors,
			name,
			type,
			place
		})};

	//insert into table
	Soil.create({
		name: name,
		type: type,
		place: place
	})
		.then(soil => res.redirect('/soil/add'))
		.catch(err => console.log(err));

});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();

  Soil.findAll({ where: { name: { [Op.like]: term } } })
    .then(soil => res.render('dissoil', { soil }))
    .catch(err => console.log(err));
});


module.exports = router;