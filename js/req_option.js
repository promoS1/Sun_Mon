"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// ALLER A LA PAGE OPTION

	page = fs.readFileSync('../html/modele_options.html', 'utf-8');
	
	
	
	//Commun a toute les page \\
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	//                         \\
	
	
	
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
