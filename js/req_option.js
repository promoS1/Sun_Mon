"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// ALLER A LA PAGE OPTION

	page = fs.readFileSync('../html/modele_options.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
