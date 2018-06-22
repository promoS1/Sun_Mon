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
	var hote;
	var invite;
	var nomStat = {};
	var multiStat = {};
	var adversaire;
	var statAdver = {}
	page = fs.readFileSync('html/modele_multi_3x3.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	nom = query.pseudo;
	hote = query.hote;
	invite = query.invite
	marqueurs.mdp = query.mdp;
	marqueurs.hote = hote;
	marqueurs.invite = invite;
	
	if (nom === hote){
		adversaire = invite;
	}else if (nom === invite){
		adversaire = hote;
	}
	//check si l'adversaire a deja gagner
	contenu = fs.readFileSync("data/"+hote+"VS"+invite+"Multi.json" , "UTF-8");
	multiStat = JSON.parse(contenu);

	contenu = fs.readFileSync("data/"+adversaire+"StatMulti.json" , "UTF-8");
	statAdver = JSON.parse(contenu);
	if (multiStat.gagne === true){
		page = fs.readFileSync('html/modele_lose_multi.html', "utf-8");
		marqueurs.gagnant = multiStat.gagnant;
		marqueurs.scoreGagnant = statAdver.score;
		marqueurs.scoreGagnant++;
		console.log("ila a gagner")
		}
	//augmentation du score
	contenu = fs.readFileSync("data/"+nom+"StatMulti.json", "utf-8"); 
	nomStat = JSON.parse(contenu);
	nomStat.score += 1;
	marqueurs.score = nomStat.score;

	/////
	contenu = fs.readFileSync("data/"+hote+"VS"+invite+"Multi.json" , "UTF-8");
	multiStat = JSON.parse(contenu);
	table = multiStat[nom];
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
	
	

	multiStat[nom] = table;
	table = JSON.stringify(table);
	if (table === "[true,true,true,true,true,true,true,true,true]"){
		page = fs.readFileSync('html/modele_win_multi.html', 'utf-8');		
		
		contenu = fs.readFileSync("data/"+hote+"VS"+invite+"Multi.json" , "UTF-8");
		multiStat = JSON.parse(contenu);
		multiStat.gagne = true;
		multiStat.gagnant = nom;
				
		// incrementation nombre de win 
		
		contenu = fs.readFileSync("data/"+nom+"StatMulti.json", "utf-8"); 
		nomStat = JSON.parse(contenu);
		if (nomStat.win === undefined ){
			nomStat.win = 0;
		}
		nomStat.win += 1;

		//Effacer le JSON ici 	
		
		
		//creation du json perso si il n'existe pas deja
		if(nomStat.total === undefined){
			nomStat.total = [];	
			nomStat = JSON.stringify(nomStat);
			fs.writeFileSync("data/"+nom+"StatMulti.json", nomStat, "utf-8")
			contenu = fs.readFileSync("data/"+nom+"StatMulti.json", "utf-8"); 
			nomStat = JSON.parse(contenu);
		}
		
		nomStat.total.push(nomStat.score);
	}
	multiStat = JSON.stringify(multiStat);
	fs.writeFileSync("data/"+hote+"VS"+invite+"Multi.json", multiStat, 'utf-8');
	
	nomStat = JSON.stringify(nomStat);
	fs.writeFileSync("data/"+nom+"StatMulti.json", nomStat, "utf-8")


				//creation des marqueurs
				
	contenu = fs.readFileSync("data/"+hote+"VS"+invite+"Multi.json" , "UTF-8");
	multiStat = JSON.parse(contenu);
	list = multiStat[nom];
	
		
	
	if(list[0] === false) {
		marqueurs.c1 = "Lune.png";
	} else {
		marqueurs.c1 = "Soleil.png";
	}

	if(list[1] === false) {
		marqueurs.c2 = "Lune.png";
	} else {
		marqueurs.c2 = "Soleil.png";
	}

	if(list[2] === false) {
		marqueurs.c3 = "Lune.png";
	} else {
		marqueurs.c3 = "Soleil.png";
	}

	if(list[3] === false) {
		marqueurs.c4 = "Lune.png";
	} else {
		marqueurs.c4 = "Soleil.png";
	}	

	if(list[4] === false) {
		marqueurs.c5 = "Lune.png";
	} else {
		marqueurs.c5 = "Soleil.png";
	}				
	
	if(list[5] === false) {
		marqueurs.c6 = "Lune.png";
	} else {
		marqueurs.c6 = "Soleil.png";
	}	

	if(list[6] === false) {
		marqueurs.c7 = "Lune.png";
	} else {
		marqueurs.c7 = "Soleil.png";
	}

	if(list[7] === false) {
		marqueurs.c8 = "Lune.png";
	} else {
		marqueurs.c8 = "Soleil.png";
	}
	
	if(list[8] === false) {
		marqueurs.c9 = "Lune.png";
	} else {
		marqueurs.c9 = "Soleil.png";
	}
	
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
