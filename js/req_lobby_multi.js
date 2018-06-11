"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var mdp
	var page;
	var nom;
	var multi = [];
	var contenu;
	var defi;
	var list= [];
	var i;
	var inscrit;
	var listInvite = [];
	var listAccepter = {};
	var hote;
	var invite;

	//ALLER A LA PAGE LOBBY MULTI

	page = fs.readFileSync ('html/modele_lobby_multi.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreurs ="";
	marqueurs.invitation = "";
	marqueurs.refus = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom = query.pseudo;
	mdp = query.mdp;
	marqueurs.invite = query.invite;
	marqueurs.hote = query.hote;
		//inscription dadns liste des dispo
	contenu = fs.readFileSync("data/lobbyMulti.json" , "utf-8")
	list = JSON.parse(contenu);


	inscrit = false;
	contenu = fs.readFileSync("data/lobbyMulti.json" , "utf-8")
	multi = JSON.parse(contenu);
	
	
	
	for (i=0;i<list.length;i++){
		if (nom === list[i]){
			inscrit = true;
			}
	}	


	if (inscrit === false){
		multi.push(nom);
		multi = JSON.stringify(multi);
		fs.writeFileSync("data/lobbyMulti.json", multi , "utf-8");
	}






		//affichage des adversaires
	defi =" </br>";		
	for (i=0;i<list.length;i++){
		if(nom !== list[i]){
			defi += "<a href=\"req_demande_invite?pseudo="+nom+"&mdp="+mdp+"&invite="+list[i]+"&hote="+nom+"\"><input type=\"button\" value=\""+list[i]+"\" /></a></br>";
		}
	}

	//check liste invite

	contenu = fs.readFileSync("data/invitation.json", "utf-8");
	listInvite = JSON.parse(contenu);
	for(i=0; i<listInvite.length; i++){
			console.log("liste = "+listInvite[i]+"  acheminement = "+i);
		if (nom === listInvite[i]){
			hote = listInvite[i+1];
			marqueurs.invitation = "Invitation de "+hote+" reçu <a href=\"req_multi_3x3?pseudo="+nom+"&mdp="+mdp+"&hote="+hote+"&invite="+nom+"\"><input type=\"button\" value=\"Accepter\"/></a></br>";
		}
	}

	marqueurs.defi = defi
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
