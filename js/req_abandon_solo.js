"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){



	var marqueurs;
	var mdp;
	
	//ALLER A LA PAGE GAGNER

	page = fs.readFileSync('../html/modele_menu');

	marqueurs.abandon="Vous avez abandonnez votre derniere partie";

	//Commun a toutes les pages\\
	marqueurs = {};
	marqueur.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	//							\\
}
