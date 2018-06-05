"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var contenu;
	var list = [];


	marqueurs = {};
	marqueurs.abandon="";
	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("data/membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].mdp === query.mdp) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 
	console.log(trouve);
	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('html/modele_accueil.html', 'utf-8');

		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		marqueurs.mdp = query.mdp;
		page = page.supplant(marqueurs);

	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

		page = fs.readFileSync('html/modele_menu.html', 'UTF-8');

		marqueurs.pseudo = query.pseudo;
		marqueurs.mdp = query.mdp;
		page = page.supplant(marqueurs);
	}
	
	//SI ON SET DANS LOBBY MULTI 
	
	contenu = fs.readFileSync("data/lobbyMulti.json","utf-8");
	list = JSON.parse(contenu);

	for (i=0;i<list.length;i++){
		if(list[i] === query.pseudo){
			list.splice(i,1)
		}
	}
	
	list = JSON.stringify(list);
	fs.writeFileSync("data/lobbyMulti.json", list , "utf-8");

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
