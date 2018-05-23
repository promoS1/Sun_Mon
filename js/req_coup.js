"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var contenu;
	var i;
	var x;
	var table = [];
	var list = [];
	var nom;
	var nomStat = {};
	page = fs.readFileSync('../html/modele_solo_3x3.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom = query.pseudo;
	
	contenu = fs.readFileSync("json/"+nom+"Stat.json", "utf-8"); 
	nomStat = JSON.parse(contenu);
	nomStat.score += 1;
	marqueurs.score = nomStat.score;
	contenu = fs.readFileSync("json/"+nom+"3x3.json" , "UTF-8");
	table = JSON.parse(contenu);


		if (query.cell === "1") {		
			table[0] = !table[0];
			table[1] = !table[1];
			table[3] = !table[3];
			console.log("1");
		}
		if (query.cell === "2") {
			table[0] = !table[0];
			table[1] = !table[1];
			table[2] = !table[2];
			table[4] = !table[4];		
			console.log("2");
		}
		if (query.cell === "3") {
			table[1] = !table[1];
			table[2] = !table[2];
			table[5] = !table[5];
			console.log("3");
		}
		if (query.cell === "4") {
			table[0] = !table[0];
			table[3] = !table[3];
			table[4] = !table[4];
			table[6] = !table[6];
			console.log("4");
		}
		if (query.cell === "5") {
			table[1] = !table[1];
			table[3] = !table[3];
			table[4] = !table[4];
			table[5] = !table[5];
			table[7] = !table[7];
			console.log("5");
		}
		if (query.cell === "6") {
			table[2] = !table[2];
			table[4] = !table[4];
			table[5] = !table[5];
			table[8] = !table[8];
			console.log("6");
		}
		if (query.cell === "7") {
			table[3] = !table[3];
			table[6] = !table[6];
			table[7] = !table[7];
			console.log("7");
		}
		if (query.cell === "8") {
			table[4] = !table[4];
			table[6] = !table[6];
			table[7] = !table[7];
			table[8] = !table[8];
			console.log("8");
		}
		if (query.cell === "9") {
			table[5] = !table[5];
			table[7] = !table[7];
			table[8] = !table[8];
			console.log("9");
		}
	
	


	table = JSON.stringify(table);
	if (table === "[true,true,true,true,true,true,true,true,true]"){
		page = fs.readFileSync('../html/modele_win_solo.html', 'utf-8');	
	
		console.log(nomStat.total);
		if(nomStat.total === undefined){
			nomStat.total = [];	
			nomStat = JSON.stringify(nomStat);
			fs.writeFileSync("json/"+nom+"Stat.json", nomStat, "utf-8")
			contenu = fs.readFileSync("json/"+nom+"Stat.json", "utf-8"); 
			nomStat = JSON.parse(contenu);
		}
		
		nomStat.total.push(nomStat.score);
	}
	fs.writeFileSync("json/"+nom+"3x3.json", [table], 'utf-8');
	
	nomStat = JSON.stringify(nomStat);
	fs.writeFileSync("json/"+nom+"Stat.json", nomStat, "utf-8")

	contenu = fs.readFileSync("json/"+nom+"3x3.json" , "UTF-8");
	list = JSON.parse(contenu);
	
	
	
	if(list[0] === false) {
		marqueurs.c1 = "\"Lune.png\"";
	} else {
		marqueurs.c1 = "\"Soleil.png\"";
	}

	if(list[1] === false) {
		marqueurs.c2 = "\"Lune.png\"";
	} else {
		marqueurs.c2 = "\"Soleil.png\"";
	}

	if(list[2] === false) {
		marqueurs.c3 = "\"Lune.png\"";
	} else {
		marqueurs.c3 = "\"Soleil.png\"";
	}

	if(list[3] === false) {
		marqueurs.c4 = "\"Lune.png\"";
	} else {
		marqueurs.c4 = "\"Soleil.png\"";
	}	

	if(list[4] === false) {
		marqueurs.c5 = "\"Lune.png\"";
	} else {
		marqueurs.c5 = "\"Soleil.png\"";
	}				
	
	if(list[5] === false) {
		marqueurs.c6 = "\"Lune.png\"";
	} else {
		marqueurs.c6 = "\"Soleil.png\"";
	}	

	if(list[6] === false) {
		marqueurs.c7 = "\"Lune.png\"";
	} else {
		marqueurs.c7 = "\"Soleil.png\"";
	}

	if(list[7] === false) {
		marqueurs.c8 = "\"Lune.png\"";
	} else {
		marqueurs.c8 = "\"Soleil.png\"";
	}
	
	if(list[8] === false) {
		marqueurs.c9 = "\"Lune.png\"";
	} else {
		marqueurs.c9 = "\"Soleil.png\"";
	}
	
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
