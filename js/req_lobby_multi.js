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
	
	
	//ALLER A LA PAGE LOBBY MULTI

	page = fs.readFileSync ('../html/modele_lobby_multi.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreurs ="";
	
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom = query.pseudo;
	mdp = query.mdp;
	contenu = fs.readFileSync("json/lobbyMulti.json" , "utf-8")
	list = JSON.parse(contenu);


	inscrit = false;
	contenu = fs.readFileSync("json/lobbyMulti.json" , "utf-8")
	multi = JSON.parse(contenu);
	
	
	
	for (i=0;i<list.length;i++){
		if (nom === list[i]){
			inscrit = true;
			}
	}	


	if (inscrit === false){
		multi.push(nom);
		multi = JSON.stringify(multi);
		fs.writeFileSync("json/lobbyMulti.json", multi , "utf-8");
	}







	defi =" </br>";		
	for (i=0;i<list.length;i++){
	defi += "<a href=req_demande_invite?pseudo="+nom+"&mdp="+mdp+"&cible="+list[i]+"><input type=\"button\" value=\""+list[i]+"\" /></a></br>";
	}



	marqueurs.defi = defi
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = trait;
