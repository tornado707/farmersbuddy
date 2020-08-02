const express = require('express');
const router = express.Router();
const Handlebars = require('express-handlebars');
const db = require('../config/database');
const Machine = require('../models/Machine');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ensureAuthenticated } = require('../config/auth');
//show all machineries

router.get('/show',ensureAuthenticated, (req,res) => 
	Machine.findAll()
	.then(machine => {
		res.render('disMachine', {
			machine
		});
	})
	.catch(err => console.log(err)));

//detail view
router.get('/show/:name',ensureAuthenticated, (req,res) => 
	{
	Machine.findOne({where: {
		name: req.params.name
	}}).then(machine => {
		res.render('detailAll', {
			machine : machine.dataValues
		})
	}).catch(err => console.log(err));
	}
	);

//display add flower form
router.get('/add', ensureAuthenticated,(req,res) => {
	res.render('addMachine');
});

//add flower to database
router.post('/add' ,ensureAuthenticated, (req,res) => {

	let {name,price,info,uses, imageUrl, videoUrl} = req.body;

	let errors = [];
	//errors or blank check
	if(!name){
		errors.push({text: 'PLease add a name'});
	}
	if(!price){
		errors.push({text: 'PLease add some price'});
	}
	if(!info){
		errors.push({text: 'PLease add a information'});
	}
	
	//check for errors
	if(errors.length > 0){
		res.render('addMachine', {
			errors,
			name,
			price,
			info
		})};

	//insert into table
	Machine.create({
		name: name,
		price: price,
		info: info,
		uses: uses,
		imageUrl: imageUrl,
		videoUrl: videoUrl
	})
		.then(fertilizer => res.redirect('/machine/add'))
		.catch(err => console.log(err));

});

// Search for gigs
router.get('/search',ensureAuthenticated, (req, res) => {
  let { term } = req.query;

  // Make lowercase
 // term = term.toLowerCase();

  Machine.findAll({ where: { name: { [Op.like]: term } } })
    .then(machine => res.render('disMachine', { machine }))
    .catch(err => console.log(err));
});

module.exports = router;