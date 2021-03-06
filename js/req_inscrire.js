"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var mdp;
	mdp = query.mdp;
	var v_mdp;
	v_mdp = query.v_mdp;
	var page;
	var Membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;
	var mdp_correct;
	var mdp_taille;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("data/membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);
	
	// ON VERIFIE QUE LE MDP A PLUS DE 8 CARACTERES
	mdp_taille=true;
	if (mdp.length < 7) {
		mdp_taille=false;
		console.log(mdp[1]);
	}
	
	// ON TEST SI LES 2 MDP CORRESPONDENT
	
	if (mdp === v_mdp){
		mdp_correct= true ;
		console.log(" correct = true	// mdp = "+mdp+" v_mdp = "+v_mdp)
	}else {
		mdp_correct= false ;
		console.log(" correct = false	// mdp = "+mdp+" v_mdp = "+v_mdp)
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

	console.log("trouve = "+trouve);
	// ON RENVOIT UNE PAGE HTML 
	if(trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('html/modele_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else	if ( mdp_correct === false || mdp_taille === false) {
	
	// ON RENVOI UNE ERREUR SI LES 2 MDP NE CORRESPONDENT PAS
	
	page = fs.readFileSync('html/modele_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : Les mots de passe ne correspondent pas ou ne comporte pas 8 caractères ou plus.";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);


		
	}
	

	// SI AUCUNE ERREUR, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES
	

 	if(trouve === false && mdp_correct === true && mdp_taille === true) {
		Membre = {};
		Membre.pseudo = query.pseudo;
		Membre.mdp = query.mdp;
		listeMembres[listeMembres.length] = Membre;

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("data/membres.json", contenu_fichier, 'utf-8');

	} 
	if (trouve === false && mdp_correct === true && mdp_taille === true){	
		var stat={};
		var statmulti={};
		stat=JSON.stringify(stat);
		statmulti=JSON.stringify(statmulti);
		fs.writeFileSync("data/"+query.pseudo+"Stat.json",stat,"UTF-8")	
		fs.writeFileSync("data/"+query.pseudo+"StatMulti.json",statmulti,"UTF-8")	
		// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

		page = fs.readFileSync('html/modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.mdp = query.mdp;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
