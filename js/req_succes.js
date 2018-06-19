"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var contenu;
	var nom;
	var partie;
	var nomStat;
	// ALLER A LA PAGE SUCCES
	
	page = fs.readFileSync('html/modele_succes.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom = query.pseudo;

	contenu = fs.readFileSync("data/"+nom+"Stat.json", "utf-8");
	nomStat = JSON.parse(contenu);
	partie = nomStat.partie;
	if (partie >= 1) {
		marqueurs.succes_1 = "Obtenu";
	} else {
		marqueurs.succes_1 = "A obtenir";
	}
	if (partie >= 20) {
		marqueurs.succes_2 = "Obtenu";
	} else {
		marqueurs.succes_2 = "A obtenir";
	}
	if (partie >= 40) {
		marqueurs.succes_3 = "Obtenu";
	} else {
		marqueurs.succes_3 = "A obtenir";
	}
	if (partie >= 60) {
		marqueurs.succes_4 = "Obtenu";
	} else {
		marqueurs.succes_4 = "A obtenir";
	}
	if (partie >= 80) {
		marqueurs.succes_5 = "Obtenu";
	} else {
		marqueurs.succes_5 = "A obtenir";
	}
	if (partie >= 100) {
		marqueurs.succes_6 = "Obtenu";
	} else {
		marqueurs.succes_6 = "A obtenir";
	}
	if (partie >= 666212213214) {
		marqueurs.succes_7 = "Obtenu";
	} else {
		marqueurs.succes_7 = "A obtenir";
	}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;

