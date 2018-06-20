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
	

var y;
var x;
var change;

for(x=1; x<list.length;x++){
	y = false;
	i = x;
	while(y===false){
		if (i === 0){
			i++;
		}
		if (list[i].stat > list[(i-1)].stat){
			change = list[i];
			list[i] = list[i-1];
			list[i-1] = change;
			i--
		}else {
			y = true;
		}
	}
}

	//MARQUEURS

	marqueurs.rank1 = list[0].pseudo
	marqueurs.multiwin1 = list[0].stat

	marqueurs.rank2 = list[1].pseudo
	marqueurs.multiwin2 = list[1].stat

	marqueurs.rank3 = list[2].pseudo
	marqueurs.multiwin3 = list[2].stat

	marqueurs.rank4 = list[3].pseudo
	marqueurs.multiwin4 = list[3].stat

	marqueurs.rank5 = list[4].pseudo
	marqueurs.multiwin5 = list[4].stat

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
