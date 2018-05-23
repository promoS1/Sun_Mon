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
	
	if (query.change_mdp === query.mdp) {

	marqueurs.erreur = "ERREUR : mot de passe identiques.";
	
	page = fs.readFileSync('../html/modele_profil.html', 'utf-8');
	
	} else {
		i = 0;
		while(i<=list.length-1) {
			if(list[i].pseudo === query.pseudo) {
				list[i].mdp = query.change_mdp;
			}
			i++;
		}
	
		contenu = JSON.stringify(list);
		fs.writeFileSync("membres.json", contenu, 'utf-8');		
	
		page = fs.readFileSync('../html/modele_profil.html', 'utf-8');
		marqueurs.erreur = "Votre mot de passe a été changé en : " + query.change_mdp;
		marqueurs.mdp = query.change_mdp;
	}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;

