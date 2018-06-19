"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var contenu;
	var i ; 			//COMPTEUR BOUCLE FOR
	var membre = [] ;
	var stat;
	var list = [];
	//ALLER A LA PAGE DU LEADERBOARD

	page = fs.readFileSync ('html/modele_leaderboard.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreurs ="";

	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	pseudo = query.pseudo;

	//LIASON DES MEMBRES ET DE LEURS STATS
	contenu = fs.readFileSync("data/membres.json" , "utf-8");
	membre = JSON.parse(contenu);
	for(i=0;i<membre.length;i++){
			try{list[i] = {};
			list[i].pseudo = membre[i].pseudo;
			contenu = fs.readFileSync("data/"+membre[i].pseudo+"StatMulti.json" , "utf-8");
			stat = JSON.parse(contenu);
			list[i].stat = stat.win;}
			catch(e){};
			if (list[i].stat === undefined){
				list[i].stat = 0;
			}
		}
		
	console.log(list);

	//ALGORITHME DE TRI
	
	for (i=0;i<list.length;i++){
		for (y=0;y<list.length;y++){
			
		}
	}


	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
