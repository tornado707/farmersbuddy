const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Fruit = require('../models/Fruit');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');

//show all fruit
router.get('/show',ensureAuthenticated, (req,res) => 
	Fruit.findAll()
	.then(fruit => {
		res.render('disFruit', {
			fruit
		});
	})
	.catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Fruit.findOne({where: {
		name: req.params.name
	}}).then(fruit => {
		res.render('detailAll', {
			fruit : fruit.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

//display add fruit form
router.get('/add',ensureAuthenticated, (req,res) => {
	res.render('addFruit');
});

//add fruit to database
router.post('/add' ,ensureAuthenticated, (req,res) => {

	let {name,season,description,imageUrl} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'PLease add a name'});
	}
	if(!season){
		errors.push({text: 'PLease add season'});
	}
	
	//check for errors
	if(errors.length > 0){
		res.render('addFruit', {
			errors,
			name,
			season
		})};

	//insert into table
	Fruit.create({
		name: name,
		season: season,
		description: description,
		imageUrl: imageUrl
	})
		.then(fruit => res.redirect('/fruit/add'))
		.catch(err => console.log(err));

});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();

  Fruit.findAll({ where: { name: { [Op.like]: term } } })
    .then(fruit => res.render('disFruit', { fruit }))
    .catch(err => console.log(err));
});


module.exports = router;