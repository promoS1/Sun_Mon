"use strict";
var fs = require("fs");
require('remedial');

var aléa = function(){
	var x;
	x = Math.floor(Math.random() * 2)+1;
	return x;
}

var trait = function (req, res, query) {
	var marqueurs;
	var pseudo;
	var mdp
	var page;
	var nom;
	//Aller a la page du jeu

	page = fs.readFileSync('../html/modele_solo_3x3.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	var y=aléa()
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	page = page.supplant(marqueurs)
	nom = query.pseudo+"3x3";
	var test = "[\""y"\",\""y"\",\""y"\",\""y"\",\""y"\",\"l\",\"l\",\"s\",\"s\"]"
	console.log("enrengistrer dans : "+nom+".json ===="+test);
	fs.writeFileSync(nom+".json", [test], 'utf-8');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};



module.exports = trait;
