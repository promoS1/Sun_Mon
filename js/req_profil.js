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
	var winMulti;
	var list = [];
	var i;
	var rank;
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

	contenu = fs.readFileSync("data/"+nom+"StatMulti.json","utf-8");
	statMulti = JSON.parse(contenu);
	winMulti = 0;
	winMulti = statMulti.win;
	
	contenu = fs.readFileSync("data/leaderboard.json", "utf-8");
	list = JSON.parse(contenu);
	
	for(i=0; i<list.length;i++) {
		if (nom === list[i].pseudo) {
			rank = list.length+1;
		}
		console.log("Rang : "+rank);
	}
	
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	marqueurs.moyennecoups = moyenne;
	marqueurs.multiwin = winMulti;
	marqueurs.rank = rank;

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
