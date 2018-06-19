"ues strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var pseudo;
	var mdp;
	var contenu;
	var nom;
	var total;
	var partie;
	var moyenne;
	// AFFICHAGE DE LA PAGE PROFIL

	page = fs.readFileSync('html/modele_profil.html', 'utf-8');
	
	nom = query.pseudo;

	contenu = fs.readFileSync("data/"+nom+"Stat.json","utf-8");
	nomStat = JSON.parse(contenu);
	total = 0;
	total = nomStat.total;
	partie = 0;
	partie = nomStat.partie;
	moyenne = 0;
	moyenne = total/partie;
	console.log(moyenne);

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	marqueurs.moyennecoups = moyenne;

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
