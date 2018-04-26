"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	var v_mdp;
	var page;
	var Membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var mdp_correct;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);
	
	// ON TEST SI LES 2 MDP CORRESPONDENT
	
	if (mdp === v_mdp){
		mdp_correct=true;
	}else {
		mdp_correct=false;
	}

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			trouve = true;
		}
		i++;
	}
	
	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

	if(trouve === false) {
		Membre = {};
		Membre.pseudo = query.pseudo;
		Membre.mdp = query.mdp;
		listeMembres[listeMembres.length] = Membre;

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	}


	// ON RENVOIT UNE PAGE HTML 

	if(trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('../html/modele_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else if ( mdp_correct === false ) {
	// ON RENVOI UNE ERREUR SI LES 2 MDP NE CORRESPONDENT PAS
	
	page = fs.readFileSync('../html/modele_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : Les mots de passe ne correspondent pas";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);


		
	}else {
		
		// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

		page = fs.readFileSync('../html/modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.mdp = query.mdp;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

