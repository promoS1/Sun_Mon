"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_connexion = require("./js/req_connexion.js");
var req_page_inscription = require("./js/req_page_inscription.js");
var req_menu = require("./js/req_menu.js");
var req_lobby_multi = require("./js/req_lobby_multi.js");
var req_leaderboard = require("./js/req_leaderboard.js");
var req_succes = require("./js/req_succes.js");
var req_profil = require("./js/req_profil.js");
var req_demande_invite = require("./js/req_demande_invite.js");
var req_coup = require("./js/req_coup.js");
var req_change_pseudo = require("./js/req_change_pseudo.js");
var req_change_mdp = require("./js/req_change_mdp.js");
var req_refus = require("./js/req_refus.js");
var req_accepter = require("./js/req_accepter.js");
var req_abandon_solo = require("./js/req_abandon_solo.js");
var req_abandon_multi = require("./js/req_abandon_multi.js");
var req_inscrire = require("./js/req_inscrire.js");
var req_identifier = require("./js/req_identifier.js");
var req_statique = require("./js/req_statique.js");
var req_erreur = require("./js/req_erreur.js");
var req_solo_3x3 = require("./js/req_solo_3x3.js");
var req_multi_3x3 = require("./js/req_multi_3x3.js");
var req_coup_multi = require("./js/req_coup_multi.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_connexion':
				req_connexion(req, res, query);
				break;
			case '/req_page_inscription':
				req_page_inscription(req, res, query);
				break;
			case '/req_menu':
				req_menu(req, res, query);
				break;
			case '/req_lobby_multi':
				req_lobby_multi(req, res, query);
				break;
			case '/req_leaderboard':
				req_leaderboard(req, res, query);
				break;
			case '/req_succes':
				req_succes(req, res, query);
				break;
			case '/req_profil':
				req_profil(req, res, query);
				break;
			case '/req_refus':
				req_refus(req, res, query);
				break;
			case '/req_coup':
				req_coup(req, res, query);
				break;
			case '/req_abandon_solo':
				req_abandon_solo(req, res, query);
				break;
			case '/req_abandon_multi':
				req_abandon_multi(req, res, query);
				break;
			case '/req_demande_invite':
				req_demande_invite(req, res, query);
				break;
			case '/req_change_mdp':
				req_change_mdp(req, res, query);
				break;
			case '/req_change_pseudo':
				req_change_pseudo(req, res, query);
				break;
			case '/req_accepter':
				req_accepter(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_erreur':
				req_erreur(req, res, query);
				break;
			case '/req_solo_3x3':
				req_solo_3x3(req, res, query);
				break;
			case '/req_multi_3x3':
				req_multi_3x3(req, res, query);
				break;
			case '/req_coup_multi':
				req_coup_multi(req, res, query);
				break;

			default:
				req_statique(req, res, pathname);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
