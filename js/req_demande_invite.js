"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){
	var marqueurs;
	var pseudo;
	var mdp;
	var hote;
	var invite;
	var contenu;
	var list = [];
	var i; //conopteur boucle for
	var listInvite= [];
	var listAccepter = {};
	var trouve;
	var page;
	var check;
	var req_multi_3x3 = require("./req_multi_3x3.js");
	marqueurs = {};
	
	pseudo = query.pseudo;
	marqueurs.pseudo = query.pseudo
	hote = marqueurs.pseudo;
	marqueurs.mdp = query.mdp
	marqueurs.invite = query.invite
	invite = marqueurs.invite;

	page = fs.readFileSync ('../html/modele_demande_hote.html', 'utf-8');

	//quitte la liste du lobby

	contenu = fs.readFileSync("json/lobbyMulti.json","utf-8");
	list = JSON.parse(contenu);

	for (i=0;i<list.length;i++){
		if(list[i] === query.pseudo){
			list.splice(i,1)
		}
	}

	list = JSON.stringify(list);
	fs.writeFileSync("json/lobbyMulti.json", list , "utf-8");
	
	// ajouter linvite a la liste invite
	contenu = fs.readFileSync("json/invitation.json" , "utf-8");
	listInvite = JSON.parse(contenu);
	
	console.log(pseudo+" demande " +invite);	
	trouve = false;
	for (i=0; i<listInvite.length;i++){
		if(listInvite[i] === invite){
			trouve = true
			console.log(pseudo + " invite "+ invite+" et trouve = "+trouve);
		}
	}	
	if (trouve === false){

			console.log(pseudo + " invite "+ invite+" et trouve = "+trouve);
		listInvite.push(invite);
		listInvite.push("."+pseudo);
	}

	listInvite = JSON.stringify(listInvite);
	listInvite = fs.writeFileSync("json/invitation.json", listInvite , "utf-8");

	//renvoi vers la parti si l'invite a accepter
	
	
	contenu = fs.readFileSync("json/accepter.json" , "utf-8");
	listAccepter = JSON.parse(contenu);
	
		
			if (listAccepter[invite] === true){
				
				//Desincription de la liste des attentes
				contenu = fs.readFileSyc('json/accepter.json','utf-8');
				listAccepter = JSON.parse(contenu);

				delete listeAccepter[invite];

				listAccepter = JSONstringify(listAccepter);
				fs.writeFileSync("json/accepter.json", listAccepter, 'utf-8');
					
				
				console.log("combat accepter");	
				check = true;
				page = fs.readFileSync('../html/modele_transition_accepter.html','utf-8');
			}else if (listAccepter[invite] === false){
				console.log("combat refusé");	
				check = true;
				page = fs.readFileSync('../html/modele_lobby_multi.html','utf-8');
				marqueurs.refus = "Votre adversaire a refusé le combat , cette grosse timpe ...";
			}
		
	 
  
	contenu = fs.readFileSync("json/invitation.json", "utf-8");
	listInvite = JSON.parse(contenu);
	
	if (check === true){
		for (i=0; i<listInvite.length;i++){
			if(listInvite[i] === invite){
				listInvite.splice(i,2);
				req_multi_3x3(req, res, query);
			}
		}
	}
	listInvite = JSON.stringify(listInvite);
	listInvite = fs.writeFileSync("json/invitation.json", listInvite , "utf-8"); 
	
	//listAccepter = JSON.stringify(listAccepter);
	//listAccepter = fs.writeFileSync("json/accepter.json", listAccepter , "utf-8"); 

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();



};

module.exports = trait;
