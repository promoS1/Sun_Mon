"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_connexion = require("./req_connexion.js");
var req_page_inscription = require("./req_page_inscription.js");
var req_menu = require("./req_menu.js");
var req_lobby_multi = require("./req_lobby_multi.js");
var req_leaderboard = require("./req_leaderboard.js");
var req_succes = require("./req_succes.js");
var req_profil = require("./req_profil.js");
var req_demander_invite = require("./req_demander_invite.js");
var req_coup = require("./req_coup.js");
var req_change_pseudo = require("./req_change_pseudo.js");
var req_change_mdp = require("./req_change_mdp.js");
var req_refus = require("./req_refus.js");
var req_accepter = require("./req_accepter.js");
var req_abandon_solo = require("./req_abandon_solo.js");
var req_abandon_multi = require("./req_abandon_multi.js");
var req_option = require("./req_option.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_statique = require("./req_statique.js");
var req_erreur = require("./req_erreur.js");
var req_solo_3x3 = require("./req_solo_3x3.js");
var req_multi_3x3 = require("./req_multi_3x3.js");

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
			case '/req_option':
				req_option(req, res, query);
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
			case '/req_demander_invite':
				req_demander_invite(req, res, query);
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
