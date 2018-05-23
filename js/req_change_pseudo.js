"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var x;
	var i;
	var trouve;
	var list = [];
	var contenu;

	
	page = fs.readFileSync('../html/modele_profil.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";

	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;

	contenu = fs.readFileSync("membres.json", 'utf-8');
	list = JSON.parse(contenu);
	
	trouve = false;
	i = 0;
	while(i<=list.length-1 && trouve === false) {
		if(list[i].pseudo === query.change_pseudo) {
			trouve = true;
		}
		i++;
	}
	if(trouve === true) {
		
		page = fs.readFileSync('../html/modele_profil.html', 'utf-8');

		marqueurs.erreur = "ERREUR : ce pseudo existe déjà";
	} else {
		
		x = 0;
		do {
			x++;
		} while (list[x].pseudo !== query.pseudo);
		
		list[x].pseudo = query.change_pseudo;

		contenu = JSON.stringify(list);
		fs.writeFileSync("membres.json", contenu, 'utf-8');

		page = fs.readFileSync('../html/modele_profil.html', 'utf-8');
		
		marqueurs.erreur = "";
		marqueurs.pseudo = query.change_pseudo;
	}
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;

