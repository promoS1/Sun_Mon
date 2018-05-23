"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){

	var marqueurs;
	var mdp;
    var pseudo;
	var page;

	//ALLER A LA PAGE GAGNER

	page = fs.readFileSync('../html/modele_menu.html', 'utf-8');
	
	marqueurs = {};

	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	marqueurs.abandon="Vous avez abandonnez votre derniere partie";
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//----------------------------------------------------------------

module.exports = trait;
